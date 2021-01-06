import React from "react";
import { styled } from "frontity";

import List from "../../List";
import Header from "./Header";
import ChildComment from "../ChildComment";
import { avatarMargin, avatarSize } from "./Header/styles";

export const containerStyles = `
  list-style: none;
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
  css,
}) => {
  return (
    <li css={css}>
      <Header name={name} avatar={author_avatar_urls} site={site} />
      <Body dangerouslySetInnerHTML={{ __html: rendered }} />
      {children && <List items={children} Comment={ChildComment} />}
    </li>
  );
};

export default Comment;
