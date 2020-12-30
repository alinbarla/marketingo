import React, { Component } from "react";
import { styled } from "frontity";

import Container from "../../Container";
import Contact from "../../Contact/index";
import heroImage from "./hero-image.svg";
import breakpoints from "../../../constants/breakpoints";

const flexBreakpoint = breakpoints.md;
const Content = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1.875rem;
  text-align: center;
  text-align: left;
  margin-top: 3rem;

  @media (min-width: ${flexBreakpoint}) {
    flex-direction: row;
  }
`;

const Image = styled.img`
  flex-basis: calc(50% - 1rem);
  margin-top: 1.25rem;

  @media (min-width: ${flexBreakpoint}) {
    margin-top: 0;
  }
`;

const Body = styled.div`
  flex-basis: calc(50% - 1rem);
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.25rem;
  font-weight: 900;
  text-align: center;

  @media (min-width: ${flexBreakpoint}) {
    text-align: left;
  }

  @media (min-width: ${breakpoints.lg}) {
    margin-top: 3.75rem;
    margin-bottom: 2.1875rem;
    font-size: 3.25rem;
  }
`;

const Description = styled.p`
  font-size: 1.3rem;
  display: none;

  @media (min-width: ${breakpoints.sm}) {
    display: block;
  }
`;

export class Hero extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Body>
            <Title>Empieza un negocio online (exitoso)</Title>
            <Description>
              ¿Quieres ser emprendedor digital y ganar dinero <em>online</em>?{" "}
              <strong>
                En Remarketingo, nos dedicamos a enseñarte a crear un negocio
                online paso a paso con los mejores consejos y estrategias
                marketing.
              </strong>
            </Description>
            <Contact />
          </Body>
          <Image src={heroImage} alt="Hero image" />
        </Content>
      </Container>
    );
  }
}

export default Hero;
