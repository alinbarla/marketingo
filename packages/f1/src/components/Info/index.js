import React, { Component } from "react";
import { styled, css } from "frontity";
import { Badge, Avatar, withStyles, createStyles } from "@material-ui/core";

import avatarImage from "./avatar.jpg";

const Group = styled.div`
  display: flex;
  align-items: center;
`;

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

const Body = styled.div`
  margin-left: 1rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export class Info extends Component {
  getMonth = (date) => {
    const monthString = date.toLocaleDateString("es-MX", {
      month: "short",
    });
    const secondLastIndex = monthString.length - 1;
    // To remove the period at the end. For example, "dec." becomes "dec"
    return monthString.splice(0, secondLastIndex);
  };

  getDateString = () => {
    const { date: postDate } = this.props;
    const date = new Date(postDate);
    const month = this.getMonth(date);
    const day = date.getDate();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  render() {
    const { author, InfoText } = this.props;
    const dateString = this.getDateString();
    return (
      <Group>
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
        <Body>
          <InfoText>{author.name}</InfoText>
          <InfoText>.</InfoText>
          <InfoText>{dateString}</InfoText>
        </Body>
      </Group>
    );
  }
}

export default Info;
