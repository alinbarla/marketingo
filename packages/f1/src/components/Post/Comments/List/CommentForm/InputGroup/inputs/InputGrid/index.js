import React from "react";
import { styled } from "frontity";
import { expandColumns } from "./styles";

const Container = styled.div`
  @media (min-width: ${expandColumns}) {
    display: flex;
    justify-content: space-between;
  }
`;

export default Container;
