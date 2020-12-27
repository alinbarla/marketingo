import React, { Component } from "react";
import { styled } from "frontity";

import Hero from "./Hero";
import Testimonials from "./Testimonials";
import Introduction from "./Introduction";
import Transition from "./Transition";
import CallToAction from "./CallToAction";

const Container = styled.div`
  width: 100%;
`;

export class Home extends Component {
  render() {
    return (
      <Container>
        <Hero />
        <Testimonials />
        <Introduction />
        <Transition />
        <CallToAction />
      </Container>
    );
  }
}

export default Home;
