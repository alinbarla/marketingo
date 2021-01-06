import React from "react";
import { styled } from "frontity";

import { inputStyles } from "../styles";
import { expandColumns } from "./styles";

const InputColumn = styled.input`
  width: 100%;
  ${inputStyles}
  @media (min-width: ${expandColumns}) {
    width: 49%;
  }
`;

export default InputColumn;
