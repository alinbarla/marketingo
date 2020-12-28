import React, { Component } from "react";
import { styled } from "frontity";

import Caption from "../Caption";

const Item = styled.li`
  list-style: none;
  margin-bottom: 1.75rem;
`;

const Figure = styled.figure`
  margin-bottom: 2.75rem;
`;

const Title = styled.h3`
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
`;

export class Feature extends Component {
  render() {
    const { src, alt, title, children } = this.props;
    return (
      <Item>
        <Figure>
          <img src={src} alt={alt} />
          <Caption>{alt}</Caption>
        </Figure>
        <Title>{title}</Title>
        <p>{children}</p>
      </Item>
    );
  }
}

export default Feature;
