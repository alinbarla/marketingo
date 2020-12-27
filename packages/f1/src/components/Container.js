import { styled } from "frontity";

export const containerPaddingStyles = `
  padding-right: 15px;
  padding-left: 15px;
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  ${containerPaddingStyles}
`;

export default Container;
