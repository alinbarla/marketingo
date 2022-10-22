import React from "react";
import { connect, styled } from "frontity";
import Link from "../link";
import { expandBreaekpoint } from "./styles";

/**
 * Navigation Component
 *
 * It renders the navigation links
 */
const Nav = ({ state }) => {
  const { items } = state.source.get("all-categories/");
  const filterItems = [
    { name: "Hub", link: "/hub/" },
    ...items.filter((item) => item.name !== "Uncategorized"),
  ];

  return (
    <NavContainer>
      {filterItems.map(({ name, link }) => {
        // Check if the link matched the current page url
        const isCurrentPage = state.router.link === link;
        return (
          <NavItem key={name}>
            {/* If link url is the current page, add `aria-current` for a11y */}
            <Link link={link} aria-current={isCurrentPage ? "page" : undefined}>
              {name}
            </Link>
          </NavItem>
        );
      })}
    </NavContainer>
  );
};

export default connect(Nav);

const NavContainer = styled.nav`
  list-style: none;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0 24px;
  margin: 0;
  overflow-x: auto;
  width: 100%;
  display: none;

  @media (min-width: ${expandBreaekpoint}) {
    width: auto;
    display: flex;
  }
`;

const NavItem = styled.div`
  padding: 0;
  margin: 0 16px;
  color: var(--brand);
  font-size: 0.9em;
  box-sizing: border-box;
  flex-shrink: 0;
  height: 100%;

  & > a {
    display: inline-block;
    line-height: 2em;
    transition: all 0.3s ease;
    color: #615c5c;
    font-weight: 400;
    /* Use for semantic approach to style the current link */
    &[aria-current="page"] {
      font-weight: bold !important;
    }
  }

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;

    &:after {
      content: "";
      display: inline-block;
      width: 24px;
    }
  }
`;
