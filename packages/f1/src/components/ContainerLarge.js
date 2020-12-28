import { containerStyles } from "./Container";
import { styled } from "frontity";

export const containerLargeStyles = `
${containerStyles}
padding: 0 5%;
`;

const ContainerLarge = styled.section`
  ${containerLargeStyles}
`;

export default ContainerLarge;
