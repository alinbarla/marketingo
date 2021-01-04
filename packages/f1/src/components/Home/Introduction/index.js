import React, { Component } from "react";
import { Avatar } from "@material-ui/core";
import { styled, css } from "frontity";

import Link from "../../link";
import profilePicture from "./Alin-Barla-Remarketingo.svg";
import { ContentContainer } from "../ContentContainer";
import links from "../../../constants/links";

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

const EmphasizedSubtitlte = styled.strong`
  color: var(--brand);
  font-weight: 700;
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
      <ContentContainer>
        <AvatarContainer>
          <Avatar
            css={avatarStyles}
            variant="circular"
            src={profilePicture}
            alt="Alin"
          />
        </AvatarContainer>
        <Title>Hola, soy Alin.</Title>
        <Subtitle>
          Un poco <Link link={links.sobreMi}>sobre mi</Link>
        </Subtitle>
        <Description>
          <strong>Soy emprendedor y experto en marketing digital.</strong>{" "}
          
            Actualmente, vivo en Noruega con mi esposa Selene. Además, juntos
            viajamos por el mundo gracias al éxito de nuestros negocios online.
            De hecho, eso es a lo que me dedico. Ayudar con los mejores consejos
            y estrategias marketing a que tu puedas empezar a ganar online el
            dinero necesario para <strong>vivir la vida que mereces!</strong>
          
        </Description>
      </ContentContainer>
    );
  }
}

export default Introduction;
