import React, { useState, useEffect } from 'react';
import styles from './TodoListPage.module.css';
import Layout from '../../Layout/Layout';
import { TodoList } from '../../TodoList/TodoList';
import { TodoPanel } from '../../TodoPanel/TodoPanel';
import { Todo, TodoListType } from '../../../types/types';
import {
  getTodoLists,
  createTodoList,
  deleteTodoList,
  addTodoItem,
  updateTodoItem,
  deleteTodoItem
} from '../../../constants/todo.service';

const TodoListPage: React.FC = () => {
  const [spisochki, setSpisochki] = useState<TodoListType[]>([]);
  const [idZadachkiDlyaRedaktirovaniya, setIdZadachkiDlyaRedaktirovaniya] = useState<number | null>(null);
  const [pokazatDobavlenieZadachki, setPokazatDobavlenieZadachki] = useState<number | null>(null);

  useEffect(() => {
    zagruzitSpisochki();
  }, []);

  const zagruzitSpisochki = async () => {
    try {
      const dannye = await getTodoLists();
      setSpisochki(dannye);
    } catch (oshibochka) {
      console.error('Ой, не получилось загрузить списки:', oshibochka);
    }
  };

  const obrabotchikDobavleniyaSpisochnika = async (nazvanie: string) => {
    try {
      const noviySpisochek = await createTodoList(nazvanie);
      setSpisochki([...spisochki, noviySpisochek]);
    } catch (oshibochka) {
      console.error('Не вышло создать спиоооочек:', oshibochka);
    }
  };

  const obrabotchikUdalochkiSpisochnika = async (id: number) => {
    try {
      await deleteTodoList(id);
      setSpisochki(spisochki.filter(spisochek => spisochek.id !== id));
    } catch (oshibochka) {
      console.error('Не удаляется наш спиоооочек:', oshibochka);
    }
  };

  const dobavitZadachku = async (spisochekId: number, zadachka: Omit<Todo, 'id' | 'checked'>) => {
    try {
      const novayaZadachka = await addTodoItem(spisochekId, zadachka.name, zadachka.description);
      setSpisochki(spisochki.map(spisochek => 
        spisochek.id === spisochekId 
          ? { ...spisochek, todos: [...spisochek.todos, novayaZadachka] } 
          : spisochek
      ));
      setPokazatDobavlenieZadachki(null);
    } catch (oshibochka) {
      console.error('Не добавилась задачка:', oshibochka);
    }
  };

  const obrabotchikOtmetki = async (spisochekId: number, idZadachki: number) => {
    try {
      const zadachka = spisochki
        .find(spisochek => spisochek.id === spisochekId)
        ?.todos.find(z => z.id === idZadachki);
  
      if (zadachka) {
        const obnovlennayaZadachka = await updateTodoItem(idZadachki, { 
          checked: !zadachka.checked 
        });
        
        setSpisochki(spisochki.map(spisochek => 
          spisochek.id === spisochekId
            ? {
                ...spisochek,
                todos: spisochek.todos.map(z =>
                  z.id === idZadachki ? obnovlennayaZadachka : z
                )
              }
            : spisochek
        ));
      }
    } catch (oshibochka) {
      console.error('Не обновилась задачка:', oshibochka);
    }
  };

  const udalitZadachku = async (spisochekId: number, idZadachki: number) => {
    try {
      await deleteTodoItem(idZadachki);
      setSpisochki(spisochki.map(spisochek =>
        spisochek.id === spisochekId
          ? { 
              ...spisochek, 
              todos: spisochek.todos.filter(z => z.id !== idZadachki) 
            }
          : spisochek
      )); 
    } catch (oshibochka) {
      console.error('Не удалилась задачка:', oshibochka);
    }
  };

  const izmenitZadachku = async (spisochekId: number, zadachka: Omit<Todo, 'id' | 'checked'>) => {
    try {
      if (idZadachkiDlyaRedaktirovaniya !== null) {
        const obnovlennayaZadachka = await updateTodoItem(idZadachkiDlyaRedaktirovaniya, {
          ...zadachka,
          checked: false 
        });
        
        setSpisochki(spisochki.map(spisochek =>
          spisochek.id === spisochekId
            ? {
                ...spisochek,
                todos: spisochek.todos.map(z =>
                  z.id === idZadachkiDlyaRedaktirovaniya ? obnovlennayaZadachka : z
                )
              }
            : spisochek
        ));
        setIdZadachkiDlyaRedaktirovaniya(null);
      }
    } catch (oshibochka) {
      console.error('Не изменилась задачка:', oshibochka);
    }
  };

  return (
    <Layout>
      <div className={styles.todoListPage}>
        <div className={styles.content}>
          <h1 className={styles.title}>Мой Todo Листочек</h1>

          <div className={styles.addTodoListForm}>
            <input
              type="text"
              placeholder="Как назовём списочек?"
              onKeyDown={async (e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                  await obrabotchikDobavleniyaSpisochnika(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
              className={styles.addTodoListInput}
            />
          </div>

          {spisochki.map((spisochek) => (
            <div key={spisochek.id} className={styles.todoListContainer}>
              <div className={styles.todoListHeader}>
                <h2 className={styles.todoListTitle}>{spisochek.name}</h2>
                <button
                  className={styles.deleteTodoListButton}
                  onClick={() => obrabotchikUdalochkiSpisochnika(spisochek.id)}
                >
                  Удалить
                </button>
                <button
                  className={styles.addTodoButton}
                  onClick={() => setPokazatDobavlenieZadachki(spisochek.id)}
                >
                  Добавить
                </button>
              </div>

              {pokazatDobavlenieZadachki === spisochek.id && (
                <TodoPanel
                  mode="add"
                  listId={spisochek.id}
                  addTodo={(dannye) => dobavitZadachku(spisochek.id, dannye)}
                />
              )}
              <TodoList
                todoIdForEdit={idZadachkiDlyaRedaktirovaniya}
                todos={spisochek.todos}
                deleteTodo={(id) => udalitZadachku(spisochek.id, id)}
                checkTodo={(id) => obrabotchikOtmetki(spisochek.id, id)}
                selectTodoIdForEdit={setIdZadachkiDlyaRedaktirovaniya}
                changeTodo={(dannye) => izmenitZadachku(spisochek.id, dannye)}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TodoListPage;