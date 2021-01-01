import React from "react";
import { connect, styled } from "frontity";

import Link from "../link";
import Nav from "./nav";
import MobileMenu from "./menu";
import logo from "../images/logo-remarketingo.svg";
import breakpoints from "../../constants/breakpoints";
import { expandBreaekpoint } from "./styles";

const Image = styled.img`
  width: 12.5rem;

  @media (min-width: ${expandBreaekpoint}) {
    max-height: 5rem;
    width: 100%;
  }
`;

const Header = ({ state }) => {
  return (
    <>
      <BrandContainer>
        <StyledLink link="/">
          <Image src={logo} alt="Remarketingo" />
        </StyledLink>
        <MobileMenu />
      </BrandContainer>
      <Nav />
    </>
  );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Header);

const BrandContainer = styled.div`
  box-sizing: border-box;
  color: var(--brand);
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (min-width: ${expandBreaekpoint}) {
    width: auto;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--brand);
  transition: all 0.3s ease;
  &:hover {
    color: var(--black);
  }
`;
