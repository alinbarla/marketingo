import React from "react";
import { styled } from "frontity";
import Link from "@material-ui/core/Link";

const StyledLink = styled(Link)`
  transition: color 250ms !important;
  &:hover {
    color: ${(props) => props.theme.palette.primary.main};
  }
`;

export default React.memo(StyledLink);