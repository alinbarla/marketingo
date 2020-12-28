import React, { Component } from "react";

import Hero from "./Hero";
import Introduction from "./Introduction";
import Features from "./Features";
import CallToAction from "./CallToAction";

export class About extends Component {
  render() {
    return (
      <div>
        <Hero />
        <Introduction />
        <Features />
        <CallToAction />
      </div>
    );
  }
}

export default About;
