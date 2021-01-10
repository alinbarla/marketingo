import React, { Component } from "react";
import { styled } from "frontity";

import Avatar from "./Avatar";

const Group = styled.div`
  display: flex;
  align-items: center;
`;

const Body = styled.div`
  margin-left: 1rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const VerticalDot = styled.div`
  margin: 0 0.25rem;
`;

export class Info extends Component {
  getMonth = (date) => {
    const monthString = date.toLocaleDateString("es-MX", {
      month: "short",
    });
    const secondLastIndex = monthString.length - 1;
    // To remove the period at the end. For example, "dec." becomes "dec"
    return monthString.substring(0, secondLastIndex);
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
        <Avatar />
        <Body>
          <InfoText>{author.name}</InfoText>
          <VerticalDot>
            <InfoText>·</InfoText>
          </VerticalDot>
          <InfoText> {dateString}</InfoText>
        </Body>
      </Group>
    );
  }
}

export default Info;
