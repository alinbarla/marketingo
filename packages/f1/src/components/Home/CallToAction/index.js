import React, { Component } from "react";
import { styled } from "frontity";

import sectionImage from "./negocio-online-estrategias-marketing.svg";
import breakpoints from "../../../constants/breakpoints";

const col1 = "col1";
const col2 = "col2";
const flexBreakpoint = breakpoints.sm;

const Container = styled.div`
  padding: 5% 8%;
  background-color: #f6f5f1;
  box-sizing: border-box;
  width: 100%;
  max-width: 100rem;
  margin: 5rem auto;

  @media (min-width: ${flexBreakpoint}) {
    background-image: url(${sectionImage});
    background-repeat: no-repeat;
  }
`;

const Grid = styled.div`
  max-width: 43.75rem;
  margin: 0 auto;
  display: grid;
  column-gap: 4rem;
  font-weight: 500;
  grid-template-areas: "${col1}" "${col2}";
  grid-template-columns: 18rem;
  grid-template-rows: 13.6992rem 14.2617rem;

  @media (min-width: ${flexBreakpoint}) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 0 4em;
  }
`;

const ImageColumn = styled.div`
  grid-area: ${col1};
  padding-bottom: 1.2rem;
  width: 100%;
`;

const Image = styled.img`
  @media (min-width: ${flexBreakpoint}) {
    width: 46.875rem;
    height: auto;
    display: none;
  }
`;

const BodyColumn = styled.div`
  grid-area: ${col2};
  margin-top: 2.5rem;
  align-self: center;

  @media (min-width: ${flexBreakpoint}) {
    margin-left: 9.375rem;
    grid-area: none;
    width: 31.75rem;
  }
`;

const Title = styled.h2`
  margin-bottom: 1.25rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: ${flexBreakpoint}) {
    justify-content: flex-start;
  }
`;

const Link = styled.a`
  color: #ffffff;
  background-color: var(--brand);
  transition: transform 0.2s ease !important;
  border-radius: 6.25rem;
  padding: 0.75rem 1.25rem;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1;
`;

export class CallToAction extends Component {
  render() {
    return (
      <Container>
        <Grid>
          <ImageColumn>
            <Image
              src={sectionImage}
              alt="Woman holding a search bar. It has lines connecting to a home and shopping icon underneath it. Also, it has a cursor indicating that someone clicked on the search bar."
            />
          </ImageColumn>
          <BodyColumn>
            <Title>Las mejores estrategias marketing!</Title>
            <ButtonContainer>
              <Link href="#">Todos los recursos</Link>
            </ButtonContainer>
          </BodyColumn>
        </Grid>
      </Container>
    );
  }
}

export default CallToAction;
