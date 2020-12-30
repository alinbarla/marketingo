import React from "react";
import { styled } from "frontity";

import Item from "./Item";
import instagram from "./instagram.svg";
import tiktok from "./tiktok.svg";
import youtube from "./youtube.svg";
import { flexBreakpoint } from "../styles";

const Group = styled.ul`
  padding-left: 0;
  margin-bottom: 1.25rem;
  display: flex;
  justify-content: center;
  @media (min-width: ${flexBreakpoint}) {
    margin-bottom: 0;
  }
`;

const Social = () => {
  return (
    <Group>
      <Item
        href="https://instagram.com/remarketingo"
        src={instagram}
        alt="Instagram"
      />
      <Item href="https://vm.tiktok.com/ZSqaUGvE/" src={tiktok} alt="Tiktok" />
      <Item
        href="https://youtube.com/remarketingo"
        src={youtube}
        alt="YouTube"
      />
    </Group>
  );
};

export default Social;
