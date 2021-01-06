import React, { useEffect } from "react";
import { styled, connect } from "frontity";

import InputGrid from "./InputGroup/inputs/InputGrid";
import Name from "./Name";
import Email from "./Email";
import Website from "./Website";
import Message from "./Message";
import Button from "../../../../../components/Button";
import breakpoints from "../../../../../constants/breakpoints";
import SubmitButton from "./SubmitButton";

const Container = styled.div`
  padding: 3.4375rem 0.9375rem;
  box-shadow: 0 10px 40px 0 rgba(47, 47, 47, 0.1);
  border-radius: 0.375rem;
  @media (min-width: ${breakpoints.md}) {
    padding: 3.4375rem;
  }
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 1.25rem;
`;

const CommentNotes = styled.p`
  font-size: 1.3rem;
  margin-bottom: 1.75rem;
`;

const CommentForm = ({ postId, actions, parent }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    actions.comments.submit(postId);
  };

  const setCommentParent = () => {
    actions.comments.updateFields(postId, { parent });
  };

  useEffect(() => {
    setCommentParent();
  }, []);

  return (
    <Container>
      <Title>Deja un comentario:</Title>
      <CommentNotes>
        Estamos tomando muy en serio la privacidad de nuestros lectores
      </CommentNotes>
      <form onSubmit={handleSubmit}>
        <Message postId={postId} />
        <InputGrid>
          <Name postId={postId} />
          <Email postId={postId} />
        </InputGrid>
        <Website postId={postId} />
        <SubmitButton />
      </form>
    </Container>
  );
};

export default connect(CommentForm);
