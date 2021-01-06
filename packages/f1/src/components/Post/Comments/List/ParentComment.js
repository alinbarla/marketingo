import React from "react";
import { styled } from "frontity";

import Comment from "./Comment";
import { containerStyles } from "./Comment/styles";

const Container = styled.li`
  ${containerStyles}
`;

const ParentComment = (props) => <Comment {...props} Component={Container} />;

export default ParentComment;
