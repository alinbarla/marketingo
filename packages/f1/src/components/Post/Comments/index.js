import React, { useEffect, useState } from "react";
import { connect, styled } from "frontity";

import Container from "../../Container";
import ParentComment from "./List/ParentComment";
import List from "./List";
import CommentForm from "./List/CommentForm";

const Section = styled.section`
  max-width: 42.5rem;
  margin: 3rem auto 0;
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 900;
  padding-bottom: 0.625rem;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid gray;
`;

const Body = styled.div`
  margin-bottom: 4.375rem;
`;

const Comments = ({ state, actions, postId }) => {
  const [commentForm, setCommentForm] = useState(null);

  const commentId = `@comments/${postId}`;

  const fetchPostComments = async () => {
    await actions.source.fetch(commentId);
  };

  useEffect(() => {
    fetchPostComments();
  });

  const data = state.source.get(commentId);
  if (data.isReady && data.items) {
    return (
      <Section>
        <Container>
          <Body>
            <Title>Discussion</Title>
            <List
              items={data.items}
              Comment={ParentComment}
              commentForm={commentForm}
              setCommentForm={setCommentForm}
              postId={postId}
            />
          </Body>
          {!commentForm && (
            <CommentForm postId={postId} title="Deja un comentario:" />
          )}
        </Container>
      </Section>
    );
  }
  return <p>Loading...</p>;
};

export default connect(Comments);
