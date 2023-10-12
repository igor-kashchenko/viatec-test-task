import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import { useDispatch } from "react-redux";
import { addTodo, editTodo } from "../features/todos/todoSlice";
import { useAppSelector } from "../app/hooks";

type Props = {
  handleCloseModal: () => void;
  isEditing: boolean;
  todoToEditId?: number;
};

export const TodoForm: React.FC<Props> = ({
  handleCloseModal,
  isEditing,
  todoToEditId,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState("");

  const todos = useAppSelector((state) => state.todos.todos);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditing && todoToEditId) {
      const todoToEdit = todos.find((todo) => todo.id === todoToEditId);

      if (todoToEdit) {
        setName(todoToEdit.name);
        setDescription(todoToEdit.description);
      }
    }
  }, [isEditing, todoToEditId, todos]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    if (field === "name") {
      setNameError("");
      setName(event.target.value);
      return;
    }
    setDescription(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setNameError("");

    if (!name) {
      setNameError("Name field should not be empty");
      return;
    }

    if (isEditing && todoToEditId) {
      dispatch(editTodo({ id: todoToEditId, name, description }));
    } else {
      dispatch(addTodo({ name, description }));
    }

    handleCloseModal();
  };

  return (
    <Form
      noValidate
      className="bg-white rounded shadow p-3 w-50"
      onSubmit={handleSubmit}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="d-flex justify-content-end">
        <CloseButton onClick={handleCloseModal} />
      </div>

      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>

        <Form.Control
          type="text"
          placeholder="Enter a todo's name"
          value={name}
          onChange={(e) => handleInputChange(e, "name")}
          isInvalid={!!nameError}
        />
        <Form.Control.Feedback type="invalid">
          {nameError}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>

        <Form.Control
          as="textarea"
          placeholder="Enter a todo's description"
          value={description}
          onChange={(e) => handleInputChange(e, "description")}
        />
      </Form.Group>

      <Button type="submit"> {isEditing ? "Edit" : "Submit"}</Button>
    </Form>
  );
};
