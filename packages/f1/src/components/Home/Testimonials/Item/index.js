import React, { Component } from "react";
import { styled } from "frontity";

import Author from "./Author";

const ListItem = styled.li`
  list-style: none;
  background-color: #00d07e;
  color: #ffffff;
  margin: 0 auto;
  padding: 5%;
  border-radius: 5px;
  margin-bottom: 1.2em;
  max-width: 42.5rem;
`;

const Body = styled.p`
  line-height: 1.6;
  font-size: 1.3rem;
  margin-bottom: 1.75rem;
`;

export class Item extends Component {
  render() {
    const { children, author } = this.props;
    return (
      <ListItem>
        <Body>{children}</Body>
        <Author {...author} />
      </ListItem>
    );
  }
}

export default Item;
