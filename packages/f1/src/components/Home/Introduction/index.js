import React, { Component } from "react";
import { Avatar } from "@material-ui/core";
import { styled, css } from "frontity";

import profilePicture from "./Alin-Barla-Remarketingo.svg";
import { containerPaddingStyles } from "../../Container";

const verticalPadding = "0.75rem";

const Container = styled.div`
  max-width: 43.75rem;
  margin: 1.1875rem auto;
  text-align: center;
  padding-top: ${verticalPadding};
  padding-bottom: ${verticalPadding};
  ${containerPaddingStyles}
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.9375rem;
`;

const avatarStyles = css`
  width: 13.75rem !important;
  height: 13.125rem !important;
`;

const Title = styled.h1`
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.028rem;
  line-height: 1.68rem;
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  padding-top: 0.3125rem;
  line-height: 2.275rem;
`;

const Description = styled.p`
  padding-top: 1.125rem;
  font-size: 1.3rem;
  line-height: 2.08rem;
  color: rgb(50, 55, 60);
`;

export class Introduction extends Component {
  render() {
    return (
      <Container>
        <AvatarContainer>
          <Avatar
            css={avatarStyles}
            variant="circular"
            src={profilePicture}
            alt="Alin"
          />
        </AvatarContainer>
        <Title>Hola, soy Alin.</Title>
        <Subtitle>Un poco sobre mi</Subtitle>
        <Description>
          <strong>Soy emprendedor y experto en marketing digital.</strong>{" "}
          Actualmente, vivo en Noruega con mi esposa Selene. Además, juntos
          viajamos por el mundo gracias al éxito de nuestros negocios online. De
          hecho, eso es a lo que me dedico. Ayudar con los mejores consejos y
          estrategias marketing a que tu puedas empezar a ganar online el dinero
          necesario para vivir la vida que mereces!
        </Description>
      </Container>
    );
  }
}

export default Introduction;
