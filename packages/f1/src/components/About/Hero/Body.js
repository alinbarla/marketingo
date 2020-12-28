import React, { Component } from "react";
import { styled } from "frontity";

import Contact from "../../Contact";
import { columnWidthStyles } from "./styles";

const Container = styled.section`
  ${columnWidthStyles}
`;

const Title = styled.h2`
  margin-bottom: 1.25rem;
`;

const Body = styled.div`
  margin-bottom: 3.25rem;
`;

const Description = styled.p`
  font-size: 1.3rem;
`;

export class BodyColumn extends Component {
  render() {
    return (
      <Container>
        <Body>
          <Title>¿Quieres empezar un negocio online?</Title>
          <Description>
            Llegaste al lugar correcto. En Remarketingo nos dedicamos a
            entregarte las mejores estrategias marketing para que te conviertas
            en emprendedor digital y ganarte la libertad financiera que te
            mereces.
          </Description>
        </Body>
        <Contact />
      </Container>
    );
  }
}

export default BodyColumn;
