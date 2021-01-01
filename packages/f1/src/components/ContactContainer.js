import React from "react";
import { css } from "frontity";

import breakpoints from "../constants/breakpoints";
import Contact from "./Contact";

const containerStyles = css`
  width: 100%;
  @media (min-width: ${breakpoints.lg}) {
    width: 50%;
    margin: 0 auto;
  }
`;

const ContactContainer = () => (
  <div css={containerStyles}>
    <Contact />
  </div>
);

export default ContactContainer;
