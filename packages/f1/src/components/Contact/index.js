import React, { Component } from "react";
import { styled } from "frontity";

import Metadata from "./Metadata";

const Group = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;
  align-items: stretch;
`;

const borderRadius = "0.375rem";
const minHeight = "3.7875rem";

const Input = styled.input`
  border-radius: ${borderRadius};
  background-color: #ffffff;
  color: #000000;
  text-decoration: none;
  font-style: normal;
  font-weight: normal;
  font-size: inherit;
  border: 1px solid #e6e6e6;
  padding: 0.9375rem;
  flex-grow: 1;
  min-height: ${minHeight};

  &:focus {
    background-color: inherit;
    border-color: #cccccc;
    border-width: 2px;
    border-style: inset;
  }
`;

const Button = styled.button`
  min-height: ${minHeight};
  padding: 0.75rem !important;
  min-width: 7.8125rem;
  letter-spacing: 0;
  cursor: pointer;
  text-transform: none;
  font-weight: 600;
  outline: none;
  border-radius: ${borderRadius};
  font-size: 1.2031rem;
  color: #fff;
  background-color: #00d07e;
  border-color: #00d07e;
  position: absolute;
  right: 0;
  top: 0;
`;

export class Contact extends Component {
  render() {
    return (
      <form
        action="https://www.aweber.com/scripts/addlead.pl"
        method="post"
        acceptCharset="UTF-8"
      >
        <Group>
          <Metadata />
          <Input
            name="email"
            type="email"
            placeholder="Tu correo electrónico"
          ></Input>
          <Button type="submit">Empieza</Button>
        </Group>
      </form>
    );
  }
}

export default Contact;
