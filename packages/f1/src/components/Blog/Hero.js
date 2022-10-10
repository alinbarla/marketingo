import React from "react";
import { styled } from "frontity";

import Container from "../Container";
import Contact from "../ContactContainer";
import breakpoints from "../../constants/breakpoints";
import InfoAvatar from "../Info/Avatar";

const flexBreakpoint = breakpoints.md;

const Section = styled.section`
  margin-bottom: 5rem;
`;

const Title = styled.h1`
  margin-bottom: 1.5rem;
  font-weight: 900;
  text-align: center;

  @media (min-width: ${breakpoints.md}) {
    font-size: 3rem;
  }

  @media (min-width: ${breakpoints.lg}) {
    font-size: 3.5rem;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 2rem;

  @media (min-width: ${flexBreakpoint}) {
    flex-direction: row;
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
  }

  @media (min-width: ${breakpoints.lg}) {
    max-width: 60%;
  }
`;

const Subtitle = styled.p`
  text-align: center;
  color: black;
  @media (min-width: ${flexBreakpoint}) {
    margin-left: 2rem;
    text-align: left;
  }
`;

const Hero = () => {
  return (
    <Section>
      <Container>
        <Title>Empieza un negocio online (exitoso)</Title>
        <Info>
          <InfoAvatar />
          <Subtitle>
            ¿Quieres ser emprendedor digital y ganar dinero online? En
            Remarketingo, nos dedicamos a enseñarte a crear un negocio online
            paso a paso con los mejores consejos y estrategias marketing.
          </Subtitle>
        </Info>
        <Contact />
      </Container>
    </Section>
  );
};

export default Hero;
