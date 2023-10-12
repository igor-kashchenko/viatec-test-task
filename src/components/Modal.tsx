import React from "react";

type Props = {
  children: React.ReactNode;
  handleCloseModal: () => void;
};

export const Modal: React.FC<Props> = ({ children, handleCloseModal }) => {
  return (
    <div
      className="position-fixed top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-center z-3"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      onClick={handleCloseModal}
    >
      {children}
    </div>
  );
};
