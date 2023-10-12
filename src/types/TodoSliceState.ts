import { GroupFilter } from "./GroupFilter";
import { Todo } from "./Todo";

export type TodoSliceState = {
  todos: Todo[];
  todoFilter: GroupFilter;
};