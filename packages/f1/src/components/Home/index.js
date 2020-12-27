import React, { Component } from "react";

import Hero from "./Hero";
import Testimonials from "./Testimonials";
import Introduction from "./Introduction";
import Transition from "./Transition";

export class Home extends Component {
  render() {
    return (
      <div>
        <Hero />
        <Testimonials />
        <Introduction />
        <Transition />
      </div>
    );
  }
}

export default Home;
