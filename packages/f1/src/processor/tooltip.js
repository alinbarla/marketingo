import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

const tooltips = {
  name: "tooltips",
  priority: 20,
  test: ({ node }) =>
    node.component === "span" &&
    node.props?.className === "marketingoTooltip" &&
    node.props?.title,

  processor: ({ node }) => {
    const tooltipTitle = node.props.title;
    const tooltipContent = node.children[0].content;
    node.component = () =>
      React.createElement(
        Tooltip,
        { title: tooltipTitle, arrow: true },
        React.createElement("span", null, tooltipContent)
      );
    return node;
  },
};

export default tooltips;
