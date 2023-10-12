import React, { useEffect, useState } from "react";
import { AppContainer } from "../components/AppContainer";
import { TodoList } from "../features/todos/TodoList";
import Button from "react-bootstrap/Button";
import { createPortal } from "react-dom";
import { TodoForm } from "../components/TodoForm";
import { Modal } from "../components/Modal";

export const App: React.FC = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [todoToEditId, setTodoToEditId] = useState<number | undefined>(
    undefined
  );

  const handleShowModal = () => {
    setIsModalShown(true);
  };

  const handleCloseModal = () => {
    setIsModalShown(false);
    setIsEditing(false);
  };

  const toggleEditMode = (todoId: number) => {
    setIsEditing(true);
    setTodoToEditId(todoId);
    handleShowModal();
  };

  useEffect(() => {
    if (isModalShown) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalShown]);

  return (
    <AppContainer>
      <p className="h1 text-center mb-3">Todo List</p>

      <TodoList toggleEditMode={toggleEditMode} />

      <div className="d-flex justify-content-center">
        <Button onClick={handleShowModal} id="open-modal-button">
          Add a Todo
        </Button>
      </div>

      {createPortal(
        isModalShown && (
          <Modal handleCloseModal={handleCloseModal}>
            <TodoForm
              handleCloseModal={handleCloseModal}
              isEditing={isEditing}
              todoToEditId={todoToEditId}
            />
          </Modal>
        ),
        document.body
      )}
    </AppContainer>
  );
};
