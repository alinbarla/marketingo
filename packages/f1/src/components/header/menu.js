import React from "react";
import { styled, connect, Global } from "frontity";
import { CloseIcon, HamburgerIcon } from "./menu-icon";
import MenuModal from "./menu-modal";
import { expandBreaekpoint } from "./styles";

function MobileMenu({ state, actions }) {
  const { isMobileMenuOpen } = state.theme;
  return (
    <>
      <MenuToggle onClick={actions.theme.toggleMobileMenu}>
        {isMobileMenuOpen ? (
          <>
            {/* Add some style to the body when menu is open,
            to prevent body scroll */}
            <Global styles={{ body: { overflowY: "hidden" } }} />
            <CloseIcon color="black" size="20px" />
          </>
        ) : (
          <HamburgerIcon color="black" size="20px" />
        )}
      </MenuToggle>
      {/* If the menu is open, render the menu modal */}
      {isMobileMenuOpen && <MenuModal />}
    </>
  );
}

const MenuToggle = styled.button`
  position: absolute;
  right: 24px;
  top: 40px;
  background: transparent;
  border: 0;
  color: var(--white);
  z-index: 5;
  height: 40px;
  width: 40px;
  outline: 0;
  margin-top: -1.25rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  &:focus {
    outline: 0;
  }
  .opensvg,
  .closesvg {
    transition: all 0.3s ease;
  }
  &:hover {
    .opensvg {
      color: var(--brand);
    }
    .closesvg {
      color: var(--white);
    }
  }
  @media (min-width: ${expandBreaekpoint}) {
    display: none;
  }
`;

export default connect(MobileMenu);
