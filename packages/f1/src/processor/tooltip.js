import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { styled } from "frontity";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import SvgIcon from "@material-ui/core/SvgIcon";

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid transparent",
    transition: "visibility, opacity, transform 200ms",
    padding: "1ch 1.5ch",
    borderRadius: "6px",
    boxShadow: "0 1em 2em -.5em rgba(0, 0, 0, 0.35)",
    backgroundColor: "#333",
    color: "#fff",
    textOverflow: "ellipsis",
  },
}))(Tooltip);

const InfoIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
  </SvgIcon>
);

const TooltipTrigger = React.forwardRef((props, ref) => (
  <React.Fragment>
    <span
      ref={ref}
      style={{
        textDecoration: "underline dotted",
        color: props.color,
      }}
      {...props}
    />
    <InfoIcon
      style={{ transform: "translate(0px,-5px)", fontSize: "1rem" }}
      htmlColor={props.color}
    />
  </React.Fragment>
));

const TitleTooltipsComponent = ({ title, description }) => (
  <React.Fragment>
    <Typography color="inherit">{title}</Typography>
    {description}
  </React.Fragment>
);

const tooltips = {
  name: "tooltips",
  priority: 20,
  test: ({ node }) =>
    node.component === "span" &&
    node.props?.className === "marketingoTooltip" &&
    node.props?.title,

  processor: ({ node }) => {
    const tooltipTitle = node.props.title || "";
    const tooltipDescription = node.props.description || "";
    const tooltipContent = node.children[0].content || "";
    const tooltipColor = node.props.color || "inherit";

    node.component = () =>
      React.createElement(
        HtmlTooltip,
        {
          title: React.createElement(
            TitleTooltipsComponent,
            { title: tooltipTitle, description: tooltipDescription },
            []
          ),
          arrow: true,
        },
        React.createElement(
          TooltipTrigger,
          { color: tooltipColor },
          tooltipContent
        )
      );
    return node;
  },
};

export default tooltips;
