import React from "react";
import { styled } from "frontity";

import { inputStyles } from "./styles";

const TextArea = styled.textarea`
  ${inputStyles}
  margin-bottom: 1.75rem;
`;

export default TextArea;
