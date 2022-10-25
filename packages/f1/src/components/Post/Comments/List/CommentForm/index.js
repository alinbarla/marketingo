import React, { useEffect } from "react";
import { styled, connect, css } from "frontity";

import InputGrid from "./InputGroup/inputs/InputGrid";
import Name from "./Name";
import Email from "./Email";
import Website from "./Website";
import Message from "./Message";
import Button from "../../../../../components/Button";
import breakpoints from "../../../../../constants/breakpoints";
import SubmitButton from "./SubmitButton";
import CommentsSnackbar from "./CommentsSnackbar";

const Container = styled.section`
  padding: 3.4375rem 0.9375rem;
  box-shadow: 0 10px 40px 0 rgba(47, 47, 47, 0.1);
  border-radius: 0.375rem;
  margin-bottom: 4.375rem;

  @media (min-width: ${breakpoints.md}) {
    padding: 3.4375rem;
  }
`;

const titleStyles = `
font-size: 2rem;
font-weight: 900;
margin-bottom: 1.25rem;
`;

const mainTitleCss = css`
  ${titleStyles}
`;

const replyTitleCss = css`
  ${titleStyles}
  border-bottom: 1px solid gray;
  padding-bottom: 0.625rem;
`;

const CommentNotes = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const CommentForm = ({ postId, actions, parent, title }) => {
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

  const titleCss = parent ? replyTitleCss : mainTitleCss;

  return (
    <Container>
      <h3 css={titleCss}>{title}</h3>
      <CommentNotes>
        🟢 Sono online e rispondo in pochi minuti 😁
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
      <CommentsSnackbar />
    </Container>
  );
};

export default connect(CommentForm);
