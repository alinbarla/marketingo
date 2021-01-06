import React from "react";
import { styled } from "frontity";

import List from "../../List";
import Header from "./Header";
import ChildComment from "../ChildComment";
import Reply from "./Reply";
import CommentForm from "../CommentForm";
import { avatarMargin, avatarSize } from "./Header/styles";
import breakpoints from "../../../../../constants/breakpoints";

const Body = styled.div`
  p {
    font-weight: 300;
    margin-bottom: 0.9375rem;
    font-size: 1.125rem;
    line-height: 1.85;
    color: #6e7076;
  }

  @media (min-width: ${breakpoints.md}) {
    padding-left: calc(${avatarSize} + ${avatarMargin});
  }
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
