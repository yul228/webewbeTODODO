import React, { useState } from 'react';
import styles from './TodoListPage.module.css';
import Layout from '../../Layout/Layout';
import { TodoList } from '../../TodoList/TodoList';
import { TodoPanel } from '../../TodoPanel/TodoPanel';
import { Todo, TodoList as TodoListType } from '../../../types/types';

const TodoListPage: React.FC = () => {
  const [todoLists, setTodoLists] = useState<TodoListType[]>([
    {
      id: 1,
      name: 'Работа',
      todos: [
        { id: 1, name: 'Задача 1', description: 'Описание 1', checked: false },
        { id: 2, name: 'задача 2', description: 'Описание 2', checked: true },
      ],
    },
    {
      id: 2,
      name: 'Домашние дела',
      todos: [
        { id: 3, name: 'Задача 1', description: 'Описание 3', checked: false },
      ],
    },
  ]);

  const [todoIdForEdit, setTodoIdForEdit] = useState<number | null>(null);
  const [showAddTodoPanel, setShowAddTodoPanel] = useState<number | null>(null); // состояние для  тудупанелькт

  const addTodoList = (name: string) => {
    const newTodoList: TodoListType = {
      id: Date.now(),
      name,
      todos: [],
    };
    setTodoLists([...todoLists, newTodoList]);
  };

  const deleteTodoList = (id: number) => {
    setTodoLists(todoLists.filter((list) => list.id !== id));
  };

  const deleteTodo = (listId: number, todoId: number) => {
    setTodoLists(
      todoLists.map((list) =>
        list.id === listId
          ? { ...list, todos: list.todos.filter((todo) => todo.id !== todoId) }
          : list
      )
    );
  };

  const checkTodo = (listId: number, todoId: number) => {
    setTodoLists(
      todoLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              todos: list.todos.map((todo) =>
                todo.id === todoId ? { ...todo, checked: !todo.checked } : todo
              ),
            }
          : list
      )
    );
  };

  const selectTodoIdForEdit = (id: number) => {
    setTodoIdForEdit(id);
  };

  const changeTodo = (listId: number, { name, description }: Omit<Todo, 'id' | 'checked'>) => {
    setTodoLists(
      todoLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              todos: list.todos.map((todo) =>
                todo.id === todoIdForEdit ? { ...todo, name, description } : todo
              ),
            }
          : list
      )
    );
    setTodoIdForEdit(null);
  };

  const addTodo = (listId: number, { name, description }: Omit<Todo, 'id' | 'checked'>) => {
    setTodoLists(
      todoLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              todos: [
                ...list.todos,
                { id: Date.now(), name, description, checked: false },
              ],
            }
          : list
      )
    );
    setShowAddTodoPanel(null); 
  };

  return (
    <div className={styles.todoListPage}>
      <Layout />
      <div className={styles.content}>
        <h1 className={styles.title}>Мой Todo Листочек</h1>

        <div className={styles.addTodoListForm}>
          <input
            type="text"
            placeholder="Название списка"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                addTodoList(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
            className={styles.addTodoListInput}
          />
        </div>

        {todoLists.map((todoList) => (
          <div key={todoList.id} className={styles.todoListContainer}>
            <div className={styles.todoListHeader}>
              <h2 className={styles.todoListTitle}>{todoList.name}</h2>
              <button
                className={styles.deleteTodoListButton}
                onClick={() => deleteTodoList(todoList.id)}
              >
                Удалить 
              </button>
              <button
                className={styles.addTodoButton}
                onClick={() => setShowAddTodoPanel(todoList.id)}
              >
                Добавить
              </button>
            </div>

            {showAddTodoPanel === todoList.id && (
              <TodoPanel
                mode="add"
                addTodo={(data) => addTodo(todoList.id, data)}
              />
            )}

            <TodoList
              todoIdForEdit={todoIdForEdit}
              todos={todoList.todos}
              deleteTodo={(id) => deleteTodo(todoList.id, id)}
              checkTodo={(id) => checkTodo(todoList.id, id)}
              selectTodoIdForEdit={selectTodoIdForEdit}
              changeTodo={(data) => changeTodo(todoList.id, data)}
            />
          </div>
        ))}
      </div>
      <Layout />
    </div>
  );
};

export default TodoListPage;