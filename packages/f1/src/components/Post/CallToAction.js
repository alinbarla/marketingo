import React from "react";
import { styled } from "frontity";

import Contact from "../Contact";
import { containerStyles } from "../Container";
import image from "./email-marketing-remarketingo.jpg";

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

const ContactContainer = styled.div`
  max-width: 31.25rem;
  margin: 0 auto;
  width: 100%;
`;

const CallToAction = () => {
  return (
    <Section>
      <Container>
        <Image
          src={image}
          alt="Paper airplane flying through the air, indicating a message being sent."
        />
        <Title>Más de 37.000 personas reciben mis consejos marketing</Title>
        <p>
          Recibe contenido marketing exclusivo que no encontrarás en el blog
          Remarketingo.
        </p>
        <ContactContainer>
          <Contact />
        </ContactContainer>
      </Container>
    </Section>
  );
};

export default CallToAction;
