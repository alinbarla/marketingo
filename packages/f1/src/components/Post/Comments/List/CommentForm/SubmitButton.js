import React from "react";
import { styled } from "frontity";
import { buttonStyles } from "../../../../Button";

const Button = styled.button`
  ${buttonStyles}
  font-size: 1rem;
  width: 100%;
`;

const SubmitButton = () => <Button type="submit">Deja un comentario</Button>;

export default SubmitButton;
