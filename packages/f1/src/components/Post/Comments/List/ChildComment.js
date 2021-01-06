import React from "react";
import { styled } from "frontity";

import Comment, { containerStyles } from "./Comment";

const Container = styled.li`
  ${containerStyles}
  border-left: 2px solid #eee;
  padding-left: 2.1875rem;
`;

const ChildComment = (props) => <Comment Component={Container} {...props} />;

export default ChildComment;
