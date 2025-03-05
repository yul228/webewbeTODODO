import api from './api';
import { TodoListType, Todo } from '../types/types';

export const getTodoLists = async (): Promise<TodoListType[]> => {
    const response = await api.get('/todo/lists');
    return response.data.map((list: any) => ({
      id: list.id,
      name: list.name,
      todos: list.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        checked: item.checked,
        todoListId: item.todo_list_id 
      }))
    }));
  };

  export const createTodoList = async (name: string): Promise<TodoListType> => {
    const response = await api.post('/todo/lists', { name });
    return {
      id: response.data.id,
      name: response.data.name,
      todos: response.data.items?.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        checked: item.checked,
        todoListId: item.todo_list_id
      })) || []
    };
  };

export const deleteTodoList = async (id: number): Promise<void> => {
  await api.delete(`/todo/lists/${id}`);
};

export const addTodoItem = async (
  listId: number, 
  name: string, 
  description: string
): Promise<Todo> => {
  const response = await api.post(`/todo/lists/${listId}/items`, { 
    name, 
    description,
    checked: false 
  });
  return response.data;
};

export const updateTodoItem = async (
    id: number,
    data: Partial<Todo>
  ): Promise<Todo> => {
 
    const snakeCaseData = {
      name: data.name,
      description: data.description,
      checked: data.checked,
      todo_list_id: data.todoListId 
    };
  
    const response = await api.patch(`/todo/items/${id}`, snakeCaseData);
  
    
    return {
      id: response.data.id,
      name: response.data.name,
      description: response.data.description,
      checked: response.data.checked,
      todoListId: response.data.todo_list_id
    };
  };
export const deleteTodoItem = async (id: number): Promise<void> => {
  await api.delete(`/todo/items/${id}`);
};