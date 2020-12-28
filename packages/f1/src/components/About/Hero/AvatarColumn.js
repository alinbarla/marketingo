import React, { Component } from "react";
import { css, styled } from "frontity";
import { columnWidthStyles, flexBreakpoint } from "./styles";

import avatarImage from "./Alin-Barla-CEO-Remarketingo-green-min.jpg";
import Caption from "../Caption";

const Column = styled.div`
  margin-bottom: 3.7rem;
  @media (min-width: ${flexBreakpoint}) {
    margin-bottom: 0;
  }
  ${columnWidthStyles}
`;

const Avatar = styled.img`
  border-radius: 0.625rem;
`;

export class AvatarColumn extends Component {
  render() {
    return (
      <Column>
        <Avatar src={avatarImage} alt="Alin Barla" />
        <Caption>ALIN BARLA – CEO REMARKETINGO</Caption>
      </Column>
    );
  }
}

export default AvatarColumn;
