import React from "react";
import { styled } from "frontity";

import List from "../../List";
import Header from "./Header";
import ChildComment from "../ChildComment";
import Reply from "./Reply";
import CommentForm from "../CommentForm";
import { avatarMargin, avatarSize } from "./Header/styles";

export const containerStyles = `
  list-style: none;
  margin: 1rem 0;
`;

const Body = styled.p`
  padding-left: calc(${avatarSize} + ${avatarMargin});
  font-size: 1.125rem;
  font-weight: 300;
  margin-bottom: 0.9375rem;
`;

const Comment = ({
  author_name: name,
  author_avatar_urls,
  author_url: site,
  content: { rendered },
  children,
  Component,
  id,
  setCommentForm,
  commentForm,
  postId,
  parent,
}) => {
  const showCommentForm = id === commentForm;
  return (
    <Component>
      <Header name={name} avatar={author_avatar_urls} site={site} />
      <Body dangerouslySetInnerHTML={{ __html: rendered }} />
      {!parent && <Reply commentId={id} setCommentForm={setCommentForm} />}
      {showCommentForm && <CommentForm parent={id} postId={postId} />}
      {children && (
        <List
          items={children}
          Comment={ChildComment}
          setCommentForm={setCommentForm}
          commentForm={commentForm}
          postId={postId}
          parent={id}
        />
      )}
    </Component>
  );
};

export default Comment;
