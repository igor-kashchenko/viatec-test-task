import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Todo as TodoType } from "../../types/Todo";
import classnames from "classnames";
import Form from "react-bootstrap/Form";
import CloseButton from "react-bootstrap/CloseButton";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodoStatus } from "./todoSlice";

type Props = {
  todo: TodoType;
  isLastTodo: boolean;
  toggleEditMode: (todoId: number) => void;
};

export const Todo: React.FC<Props> = ({ todo, isLastTodo, toggleEditMode }) => {
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch();

  const handleTodoStatus = () => {
    dispatch(toggleTodoStatus({ id: todo.id }));
  };

  const handleDeleteTodo = () => {
    dispatch(deleteTodo({ id: todo.id }));
  };

  const todoClassNames = classnames("d-flex", "border", "rounded", "p-3", {
    "mb-2": !isLastTodo,
    "bg-success": todo.isDone,
    "text-white": todo.isDone,
  });

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Row>
      <Col>
        <div
          className={todoClassNames}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ transition: "background-color 0.3s linear" }}
        >
          <div className="d-flex flex-column justify-content-center">
            <Form className="me-4">
              <Form.Check.Input
                style={{ width: "24px", height: "24px", cursor: "pointer" }}
                checked={todo.isDone}
                onChange={handleTodoStatus}
                title="change todo status"
              />
            </Form>
          </div>

          <div className="d-flex flex-column flex-grow-1">
            <div className="d-flex justify-content-between align-items-center">
              <p className="m-0 fs-3 fw-bolder">{todo.name}</p>

              <div
                className={classnames("d-flex", "align-items-center", {
                  "d-none": !isHovered,
                })}
              >
                <i
                  className="fas fa-edit fa-xl me-2"
                  style={{ cursor: "pointer" }}
                  title="Edit todo"
                  onClick={() => toggleEditMode(todo.id)}
                ></i>

                <CloseButton title="Delete todo" onClick={handleDeleteTodo} />
              </div>
            </div>

            <p className="m-0 text-break">{todo.description}</p>
          </div>
        </div>
      </Col>
    </Row>
  );
};
