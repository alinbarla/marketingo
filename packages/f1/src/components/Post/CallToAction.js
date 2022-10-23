import React from "react";
import { styled } from "frontity";

import { containerStyles } from "../Container";
import image from "./email.webp";
import ContactContainer from "../ContactContainer";

const Section = styled.section`
  background-color: #f6f5f1;
  text-align: center;
  padding: 2rem 0;
`;

const Image = styled.img`
  max-width: 54.5rem;
`;

const Title = styled.h2`
  font-weight: 900;
  margin: 2.5rem 0 1.25rem;
`;

const Container = styled.div`
  ${containerStyles}
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 54.5rem;
`;

const CallToAction = () => {
  return (
    <Section>
      <Container>
        <Image
          src={image}
          alt="Paper airplane flying through the air, indicating a message being sent."
        />
        <Title>Più di +3.700 persone ricevono il nostro contenuto</Title>
        <p>
          Ricevi direttamente nella tua mail le strategie che ci hanno aiutato a costruire un business online da 6 cifre.
        </p>
        <ContactContainer />
      </Container>
    </Section>
  );
};

export default CallToAction;
