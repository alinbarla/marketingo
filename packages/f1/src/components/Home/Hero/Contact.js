import React, { Component } from "react";
import { styled } from "frontity";

const Group = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;
`;

const Input = styled.input`
  background-color: #ffffff;
  color: #000000;
  text-decoration: none;
  font-style: normal;
  font-weight: normal;
  font-size: inherit;
  border: 1px solid #e6e6e6;
  padding: 0.9375rem;
  flex-grow: 1;

  &:focus {
    background-color: inherit;
    border-color: #cccccc;
    border-width: 2px;
    border-style: inset;
  }
`;

const Button = styled.button`
  padding: 0.75rem !important;
  min-width: 7.8125rem;
  letter-spacing: 0;
  cursor: pointer;
  text-transform: none;
  font-weight: 600;
  min-height: 3.7875rem;
  outline: none;
  border-radius: 6px;
  font-size: 19.25px;
  color: #fff;
  background-color: #00d07e;
  border-color: #00d07e;
  position: absolute;
  right: 0;
  top: 0;
`;

export class Contact extends Component {
  state = {
    email: "",
  };

  setEmail = (email) => this.setState({ email });

  handleChange = (event) => {
    this.setEmail(email.target.value);
  };

  render() {
    return (
      <form>
        <Group>
          <Input
            type="email"
            onChange={this.handleChange}
            placeholder="Tu correo electrónico"
          ></Input>
          <Button type="submit">Empieza</Button>
        </Group>
      </form>
    );
  }
}

export default Contact;
