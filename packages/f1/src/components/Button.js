import React from "react";
import { styled } from "frontity";

export const buttonStyles = `
background-color: var(--brand);
padding: 1rem 1.25rem;
border-radius: 0.375rem;
color: white;
`;

const Button = styled.button`
  ${buttonStyles}
`;

export default Button;
