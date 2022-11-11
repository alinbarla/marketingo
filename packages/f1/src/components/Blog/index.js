import React, { Component } from "react";

import Hero from "./Hero";
import List from "./ListByCategory/list";
import ExtraDiv from "../ExtraDiv";

export class Blog extends Component {
  render() {
    return (
      <ExtraDiv>
        <Hero />
        <List />
      </ExtraDiv>
    );
  }
}

export default Blog;
