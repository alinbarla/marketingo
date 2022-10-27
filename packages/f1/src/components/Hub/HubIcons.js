import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

export const ArrowRightIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M10 17l5-5-5-5v10z"></path>
  </SvgIcon>
);

export const ArrowLeftIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M14 7l-5 5 5 5V7z"></path>
  </SvgIcon>
);

export const NavigateNextIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
  </SvgIcon>
);

export const AddIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
  </SvgIcon>
);
