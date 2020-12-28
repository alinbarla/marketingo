import React, { Component } from "react";
import { styled } from "frontity";

import { containerStyles } from "../../Container";
import AvatarColumn from "./AvatarColumn";
import Body from "./Body";
import { flexBreakpoint } from "./styles";

const Section = styled.section`
  background-color: #f6f5f1;
`;

const Container = styled.div`
  ${containerStyles}
  padding-top: 6.875rem;
  padding-bottom: 4.0625rem;
  color: #1f1f1f;

  @media (min-width: ${flexBreakpoint}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

class Hero extends Component {
  render() {
    return (
      <Section>
        <Container>
          <AvatarColumn />
          <Body />
        </Container>
      </Section>
    );
  }
}

export default Hero;
