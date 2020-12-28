import { styled } from "frontity";

export const containerPaddingStyles = `
  padding-right: 15px;
  padding-left: 15px;
`;

export const containerStyles = `
max-width: 1200px;
width: 100%;
margin: 0 auto;
position: relative;
${containerPaddingStyles}
`;

const Container = styled.div`
  ${containerStyles}
`;

export default Container;
