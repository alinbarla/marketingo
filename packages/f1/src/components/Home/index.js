import React, { Component } from "react";

import Hero from "./Hero";
import Testimonials from "./Testimonials";
import Introduction from "./Introduction";

export class Home extends Component {
  render() {
    return (
      <div>
        <Hero />
        <Testimonials />
        <Introduction />
      </div>
    );
  }
}

export default Home;
