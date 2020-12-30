import React from "react";
import { styled } from "frontity";

import { containerStyles } from "../../Container";
import Social from "./Social";
import logo from "../../images/logo-remarketingo.svg";
import { flexBreakpoint } from "./styles";

const Section = styled.footer`
  background-color: #1d2b35;
  color: #fff;
  text-align: center;
  padding: 2.1875rem 0;
`;

const Container = styled.div`
  ${containerStyles}
  @media (min-width: ${flexBreakpoint}) {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const Logo = styled.img`
  margin-bottom: 20px;
  width: 100%;
  max-width: 18.75rem;
  @media (min-width: ${flexBreakpoint}) {
    margin-bottom: 0;
  }
`;

const Legal = styled.span`
  font-size: 0.875rem;
  text-transform: uppercase;
  margin-top: 0.4375rem;
  @media (min-width: ${flexBreakpoint}) {
    margin-top: 0;
  }
`;

const Footer = () => {
  return (
    <Section>
      <Container>
        <Logo src={logo} alt="Remarketingo" />
        <Social />
        <Legal>© COPYRIGHT 2021 · REMARKETINGO</Legal>
      </Container>
    </Section>
  );
};

export default Footer;
