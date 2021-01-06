import React from "react";
import { css } from "frontity";

import Comment, { containerStyles } from "./Comment";

const ParentComment = (props) => (
  <Comment
    {...props}
    css={css`
      ${containerStyles}
    `}
  />
);

export default ParentComment;
