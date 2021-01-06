import React from "react";
import { styled } from "frontity";

import Comment from "./Comment";
import { containerStyles } from "./Comment/styles";

const Container = styled.li`
  ${containerStyles}
  border-left: 2px solid #eee;
  padding-left: 2.1875rem;
  margin-left: 0.9375rem;
`;

const ChildComment = (props) => <Comment Component={Container} {...props} />;

export default ChildComment;
