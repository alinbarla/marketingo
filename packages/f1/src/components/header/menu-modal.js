import React from "react";
import { styled, connect } from "frontity";
import Link from "../link";
import logo from "../images/MARKETINGO-logo.svg";

const MenuModal = ({ state }) => {
  const { menu } = state.theme;
  const { items } = state.source.get("all-categories/");
  const filterItems = [
    { name: "Hub", link: "/hub/" },
    ...items.filter((item) => item.name !== "Uncategorized"),
  ];

  const isThereLinks = filterItems != null && filterItems.length > 0;

  return (
    <>
      <MenuOverlay />
      <MenuContent as="nav">
        {isThereLinks &&
          filterItems.map(({ name, link }) => (
            <MenuLink
              key={name}
              link={link}
              aria-current={state.router.link === link ? "page" : undefined}
            >
              {name}
            </MenuLink>
          ))}
      </MenuContent>
    </>
  );
};

const MenuOverlay = styled.div`
  background-color: var(--brand);
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-size: 300px;
  background-position-x: 10px;
  background-position-y: 20px;
  width: 100vw;
  height: 100vh;
  overflow: hidden auto;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
`;

const MenuContent = styled.div`
  z-index: 3;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  /* align-items: center; */
`;

const MenuLink = styled(Link)`
  width: 100%;
  outline: 0;
  font-size: 2rem;
  text-align: center;
  padding: 0.25rem 0;
  color: var(--white);
  display: block;
  position: relative;
  z-index: 999;
  transition: all 0.3s ease 0s;
  &:hover,
  &:focus {
    color: white;
    background-color: rgba(0, 0, 0, 0.05);
  }
  /* styles for active link */
  &[aria-current="page"] {
    font-weight: bold;
  }
`;

export default connect(MenuModal);
