import React, { Component } from "react";
import { styled, css } from "frontity";
import { Avatar } from "@material-ui/core";

import avatarImage from "./avatar.jpg";

const Group = styled.div`
  display: flex;
  align-items: center;
`;

const avatarStyles = css`
  border-color: #e7ebed;
  border-width: 0.1875rem;
  margin-right: 0.9375rem;
`;

export class Info extends Component {
  render() {
    const { author, date: postDate, InfoText } = this.props;
    const date = new Date(postDate);
    const dateString = date.toLocaleDateString("es-MX", {
      month: "short",
      year: "numeric",
      day: "numeric",
    });
    return (
      <Group>
        <Avatar css={avatarStyles} src={avatarImage} />
        <InfoText>{author.name}</InfoText>
        <InfoText>.</InfoText>
        <InfoText>{dateString}</InfoText>
      </Group>
    );
  }
}

export default Info;
