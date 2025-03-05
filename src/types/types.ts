export interface Todo {
  id: number;
  name: string;
  description: string;
  checked: boolean;
  todoListId: number;
}
  export interface TodoListType {
    id: number;
    name: string;
    todos: Todo[];
  }