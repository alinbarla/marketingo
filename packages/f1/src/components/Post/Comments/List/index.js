import React from "react";
import { styled, connect } from "frontity";

const List = styled.ol`
  list-style: none;
`;

const CommentsList = ({ items, state, Comment }) => {
  const renderComment = ({ id, children }, index) => {
    const commentData = state.source.comment[id];
    return <Comment {...commentData} key={index} children={children} />;
  };

  const renderedComments = items.map(renderComment);

  return <List>{renderedComments}</List>;
};

export default connect(CommentsList);
