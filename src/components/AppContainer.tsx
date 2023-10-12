import React from "react";
import Container from "react-bootstrap/Container";

type Props = {
  children: React.ReactNode;
};

export const AppContainer: React.FC<Props> = ({ children }) => {
  return <Container className="vh-100 py-2">{children}</Container>;
};
