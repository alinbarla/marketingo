import React, { Component } from "react";
import { Head } from "frontity";

import Hero from "./Hero";
import Introduction from "./Introduction";
import Features from "./Features";
import CallToAction from "./CallToAction";

import ExtraDiv from "../ExtraDiv";

export class About extends Component {
  render() {
    return (
      <ExtraDiv>
        <Head>
          <title>Sobre mi - Remarketingo</title>
        </Head>
        <Hero />
        <Introduction />
        <Features />
        <CallToAction />
      </ExtraDiv>
    );
  }
}

export default About;
