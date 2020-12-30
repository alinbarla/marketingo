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
`;

const Body = styled.div`
  @media (min-width: ${flexBreakpoint}) {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const Credits = styled.div`
  margin-top: 1rem;
`;

const Logo = styled.img`
  margin-bottom: 20px;
  width: 100%;
  max-width: 18.75rem;
  @media (min-width: ${flexBreakpoint}) {
    margin-bottom: 0;
  }
`;

const Legal = styled.div`
  margin-top: 0.4375rem;
  @media (min-width: ${flexBreakpoint}) {
    margin-top: 0;
  }
`;

const textSize = "0.875rem";

const LegalText = styled.p`
  font-size: ${textSize};
  line-height: 1;
  margin-bottom: 0;
`;

const Link = styled.a`
  font-size: ${textSize};
`;

const Footer = () => {
  return (
    <Section>
      <Container>
        <Body>
          <Logo src={logo} alt="Remarketingo" />
          <Social />
          <Legal>
            <LegalText>© COPYRIGHT 2021 · REMARKETINGO</LegalText>
          </Legal>
        </Body>
        <Credits>
          <LegalText>
            Icons made by{" "}
            <Link
              href="https://www.flaticon.com/authors/pixel-perfect"
              title="Pixel perfect"
            >
              Pixel perfect
            </Link>{" "}
            from{" "}
            <Link href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </Link>
          </LegalText>
          <LegalText>
            Icons made by{" "}
            <Link
              href="https://www.flaticon.com/authors/freepik"
              title="Freepik"
            >
              Freepik
            </Link>{" "}
            from{" "}
            <Link href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </Link>
          </LegalText>
        </Credits>
      </Container>
    </Section>
  );
};

export default Footer;
