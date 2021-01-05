import React, { Component } from "react";
import { styled } from "frontity";

import { containerLargeStyles } from "../ContainerLarge";
import Contact from "../Contact/index";
import ContactContainer from "../ContactContainer";

const verticalPadding = "9rem";

const color = "white";

const Section = styled.section`
  background-color: #1f1f1f;
`;

const Container = styled.div`
  ${containerLargeStyles}
  text-align: center;
  padding-top: ${verticalPadding};
  padding-bottom: ${verticalPadding};
  color: ${color};
`;

const Title = styled.h2`
  margin: 2.5rem 0 1.25rem;
  color: ${color};
  color: #f5f5f5;
  font-size: 2.5rem;
  line-height: 2.75rem;
`;

const Body = styled.div`
  margin-bottom: 1.75rem;
`;

export class CallToAction extends Component {
  render() {
    return (
      <Section>
        <Container>
          <Body>
            <Title>
              Más de +3.700 personas reciben mis consejos marketing.
            </Title>
            <p>
              Recibe contenido marketing exclusivo que no encontrarás en el blog{" "}
              
            </p>
          </Body>
          <ContactContainer />
        </Container>
      </Section>
    );
  }
}

export default CallToAction;
