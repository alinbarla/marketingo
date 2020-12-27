import { styled } from "frontity";
import { containerPaddingStyles } from "../Container";

export const verticalPadding = "0.75rem";

export const ContentContainer = styled.div`
  max-width: 43.75rem;
  margin: 1.1875rem auto;
  text-align: center;
  padding-top: ${verticalPadding};
  padding-bottom: ${verticalPadding};
  ${containerPaddingStyles}
`;

export default ContentContainer;
