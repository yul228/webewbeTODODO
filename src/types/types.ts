export interface Todo {
    id: number;
    name: string;
    description: string;
    checked: boolean;
  }
  
  export interface TodoList {
    id: number;
    name: string;
    todos: Todo[];
  }