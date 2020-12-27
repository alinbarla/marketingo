import React, { Component } from "react";
import { styled } from "frontity";

import ContentContainer from "../ContentContainer";
import arrowImage from "./down-arrow.png";

const Title = styled.h2`
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
`;

const Image = styled.img`
  width: 1rem;
  height: 4rem;
  margin: 0 auto 1.2rem;
  display: block;
`;

export class Transition extends Component {
  render() {
    return (
      <ContentContainer>
        <Title>Empieza ahora tu negocio online!</Title>
        <Image src={arrowImage} alt="Down arrow" />
      </ContentContainer>
    );
  }
}

export default Transition;
