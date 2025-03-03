import React from 'react';
import styles from './TodoPanel.module.css';
import { Todo } from '../../types/types';

const DEFAULT_TODO = { name: '', description: '' };

interface AddTodoPanelProps {
  mode: 'add';
  addTodo: ({ name, description }: Omit<Todo, 'id' | 'checked'>) => void;
}

interface EditTodoPanelProps {
  mode: 'edit';
  editTodo: Omit<Todo, 'id' | 'checked'>;
  changeTodo: ({ name, description }: Omit<Todo, 'id' | 'checked'>) => void;
}

type TodoPanelProps = AddTodoPanelProps | EditTodoPanelProps;

export const TodoPanel: React.FC<TodoPanelProps> = (props) => {
  const isEdit = props.mode === 'edit';
  const [todo, setTodo] = React.useState(isEdit ? props.editTodo : DEFAULT_TODO);

  const onClick = () => {
    if (isEdit) {
      return props.changeTodo(todo);
    }
    props.addTodo(todo);
    setTodo(DEFAULT_TODO);
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  return (
    <div className={styles.todo_panel_container}>
      <div className={styles.fields_container}>
        <div className={styles.field_container}>
          <label htmlFor='name'>
            <div>Название</div>
            <input
              autoComplete='off'
              id='name'
              value={todo.name}
              onChange={onChange}
              name='name'
              placeholder='Напиши имя задачи'
            />
          </label>
        </div>
        <div className={styles.field_container}>
          <label htmlFor='description'>
            <div>Описание</div>
            <textarea
              id='description'
              value={todo.description}
              onChange={onChange}
              name='description'
              placeholder='Напиши описание'
              rows={3} 
            />
          </label>
        </div>
      </div>
      <div className={styles.button_container}>
        {!isEdit && (
          <button onClick={onClick}>
            Добавить
          </button>
        )}
        {isEdit && (
          <button onClick={onClick}>
            Отредачить
          </button>
        )}
      </div>
    </div>
  );
};