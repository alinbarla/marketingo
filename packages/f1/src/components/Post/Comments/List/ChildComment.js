import React from "react";
import { css } from "frontity";

import Comment from "./Comment";

const commentStyles = css`
  border-left: 1px solid gray;
`;

const ChildComment = (props) => <Comment css={commentStyles} {...props} />;

export default ChildComment;
