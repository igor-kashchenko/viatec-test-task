import React from "react";
import Container from "react-bootstrap/Container";
import { Todo } from "./Todo";
import { useAppSelector } from "../../app/hooks";
import { GroupFilter } from "../../components/GroupFilter";
import { selectFilteredTodos } from "./filterSelector";
import { Todo as TodoType } from "../../types/Todo";

type Props = {
  toggleEditMode: (todoId: number) => void;
};

export const TodoList: React.FC<Props> = ({ toggleEditMode }) => {
  const todos: TodoType[] = useAppSelector(selectFilteredTodos);

  const isTodosEmpty = todos.length === 0;

  return (
    <Container
      className="border rounded shadow p-4 mb-3"
      style={{ maxWidth: "500px" }}
    >
      <GroupFilter />

      <div style={{ height: "340px" }} className="overflow-auto">
        {todos.map((todo, i) => (
          <Todo
            todo={todo}
            key={todo.id}
            isLastTodo={i === todos.length - 1}
            toggleEditMode={toggleEditMode}
          />
        ))}

        {isTodosEmpty && <p className="fs-2 text-center">No todos available</p>}
      </div>
    </Container>
  );
};
