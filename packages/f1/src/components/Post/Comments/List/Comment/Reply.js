import React from "react";
import { styled } from "frontity";

const Button = styled.button`
  font-size: 0.875rem;
  color: gray;
  text-transform: uppercase;
  background-color: transparent;
  padding: 0;
`;

const Reply = ({ setCommentForm, commentId }) => {
  const handleClick = () => setCommentForm(commentId);
  return <Button onClick={handleClick}>Responder</Button>;
};

export default Reply;
