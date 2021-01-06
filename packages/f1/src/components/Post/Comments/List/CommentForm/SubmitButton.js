import React from "react";
import { styled } from "frontity";
import { buttonStyles } from "../../../../Button";

const Button = styled.button`
  ${buttonStyles}
  font-size: 1.425rem;
  width: 100%;
  margin-top: 1.75rem;
`;

const SubmitButton = () => <Button type="submit">Deja un comentario</Button>;

export default SubmitButton;