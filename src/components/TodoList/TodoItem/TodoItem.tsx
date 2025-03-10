import React from 'react';
import styles from './TodoItem.module.css';
import { Todo } from '../../../types/types';

interface TodoItemProps {
  todo: Todo;
  deleteTodo: (id: Todo['id']) => void;
  checkTodo: (id: Todo['id']) => void;
  selectTodoIdForEdit: (id: Todo['id']) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  deleteTodo,
  checkTodo,
  selectTodoIdForEdit,
}) => (
  <div className={styles.todo_item_container} style={{ opacity: todo.checked ? 0.8 : 1 }}>
    <div>
      <div
        aria-hidden
        style={{
          opacity: todo.checked ? 0.5 : 1,
          textDecoration: todo.checked ? 'line-through' : 'none',
        }}
        onClick={() => checkTodo(todo.id)}
        className={styles.todo_item_title}
      >
        {todo.name}
      </div>
      <div aria-hidden onClick={() => checkTodo(todo.id)} className={styles.todo_item_description}>
        {todo.description}
      </div>
    </div>
    <div className={styles.todo_item_button_container}>
      <button
        className={styles.todo_item_button_edit}
        onClick={() => selectTodoIdForEdit(todo.id)}
      >
        РЕДАКТ
      </button>
      <button className={styles.todo_item_button_delete} onClick={() => deleteTodo(todo.id)}>
        ДЕЛИТЕ
      </button>
    </div>
  </div>
);