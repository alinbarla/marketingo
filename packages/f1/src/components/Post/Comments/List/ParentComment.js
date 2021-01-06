import React from "react";
import { styled } from "frontity";

import Comment, { containerStyles } from "./Comment";

const Container = styled.li`
  ${containerStyles}
`;

const ParentComment = (props) => <Comment {...props} Component={Container} />;

export default ParentComment;
