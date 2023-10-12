import { createSelector } from 'reselect';
import { GroupFilter } from '../../types/GroupFilter';
import { Todo } from '../../types/Todo';
import { TodoSliceState } from '../../types/TodoSliceState';

export const selectTodos = (state: {todos: TodoSliceState}) => state.todos.todos;
export const selectTodoFilter = (state: {todos: TodoSliceState}) => state.todos.todoFilter;

export const selectFilteredTodos = createSelector(
  [selectTodos, selectTodoFilter],
  (todos, todosFilter) => {
    return todos.filter((todo: Todo) => {
      switch (todosFilter) {
        case GroupFilter.ALL:
          return true;
        case GroupFilter.PENDING:
          return !todo.isDone;
        case GroupFilter.COMPLETED:
          return todo.isDone;
        default:
          return true;
      }
    });
  }
);
