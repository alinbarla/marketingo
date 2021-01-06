import React, { useEffect, useState } from "react";
import { connect, styled } from "frontity";

import Container from "../../ContainerLarge";
import ParentComment from "./List/ParentComment";
import List from "./List";
import CommentForm from "./List/CommentForm";

const Section = styled.section`
  margin-top: 1rem;
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 900;
  padding-bottom: 1.25rem;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid gray;
`;

const Comments = ({ state, actions, postId }) => {
  const [isReplying, setIsReplying] = useState(false);

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
          <Title>Discussion</Title>
          <List items={data.items} Comment={ParentComment} />
          {!isReplying && <CommentForm postId={postId} />}
        </Container>
      </Section>
    );
  }
  return <p>Loading...</p>;
};

export default connect(Comments);
