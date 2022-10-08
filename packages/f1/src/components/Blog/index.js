import React, { Component } from "react";

import Hero from "./Hero";
import List from "./ListByCategory/list";

export class Blog extends Component {
  render() {
    return (
      <div>
        <Hero />
        <List />
      </div>
    );
  }
}

export default Blog;
