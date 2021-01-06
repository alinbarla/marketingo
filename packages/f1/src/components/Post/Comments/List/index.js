import React from "react";
import { styled, connect } from "frontity";

const List = styled.ol`
  list-style: none;
  padding: 0;
`;

const CommentsList = ({
  items,
  state,
  Comment,
  setCommentForm,
  commentForm,
  postId,
  parent,
}) => {
  const renderComment = ({ id, children }, index) => {
    const commentData = state.source.comment[id];
    return (
      <Comment
        {...commentData}
        key={index}
        children={children}
        setCommentForm={setCommentForm}
        commentForm={commentForm}
        postId={postId}
        parent={parent}
      />
    );
  };

  const renderedComments = items.map(renderComment);

  return <List>{renderedComments}</List>;
};

export default connect(CommentsList);
