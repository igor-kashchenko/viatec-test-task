import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import todosData from '../../mockdata/todos.json';
import { TodoSliceState } from "../../types/TodoSliceState";
import { Todo } from "../../types/Todo";
import { GroupFilter } from "../../types/GroupFilter";

const initialState: TodoSliceState = {
  todos: todosData,
  todoFilter: GroupFilter.ALL
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Partial<Todo>>) => {
      const nextId = state.todos.length > 0 ? Math.max(...state.todos.map(todo => todo.id)) + 1 : 1;
    
      const newTodo: Todo = {
        id: nextId,
        name: action.payload.name!,
        description: action.payload.description || '',
        isDone: false,
      }
    
      state.todos = [...state.todos, newTodo];
    },
    toggleTodoStatus: (state, action: PayloadAction<{id: number}>) => {
      const { id } = action.payload;
    
      const updatedTodos = state.todos.map((todo) =>
        todo.id === id
          ? { ...todo, isDone: !todo.isDone }
          : todo
      );

      state.todos = updatedTodos;
    },
    deleteTodo: (state, action: PayloadAction<{id: number}>) => {
      const { id } = action.payload;

      state.todos = state.todos.filter((todo) => todo.id !== id);
    },
    editTodo: (state, action: PayloadAction<Partial<Todo>>) => {
      const { id, ...updatedTodo } = action.payload;
    
      state.todos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      );
    },

    setTodoFilter: (state, action) => {
      state.todoFilter = action.payload; 
    },
  }
})

export const { addTodo, toggleTodoStatus, deleteTodo, editTodo, setTodoFilter } = todoSlice.actions;

export default todoSlice.reducer;