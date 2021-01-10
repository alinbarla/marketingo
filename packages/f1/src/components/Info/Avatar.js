import React from "react";
import { css } from "frontity";
import { Badge, Avatar, withStyles, createStyles } from "@material-ui/core";

import avatarImage from "../images/avatar.jpg";

const badgeStyles = (theme) =>
  createStyles({
    badge: {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "$ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  });

const StyledBadge = withStyles(badgeStyles)(Badge);

const avatarStyles = css`
  border: 2px solid #e7ebed;
`;

const InfoAvatar = () => {
  return (
    <StyledBadge
      overlap="circle"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      variant="dot"
    >
      <Avatar css={avatarStyles} src={avatarImage} />
    </StyledBadge>
  );
};

export default InfoAvatar;
