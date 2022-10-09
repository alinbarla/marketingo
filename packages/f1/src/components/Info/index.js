import React, { Component } from "react";
import { styled } from "frontity";

import Avatar from "./Avatar";

const Group = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
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
    const monthString = date.toLocaleDateString("en-US", {
      month: 'long',
    });
    return monthString;
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
    const { author, InfoText, InfoTextDate = InfoText } = this.props;
    const dateString = this.getDateString();
    return (
      <Group>
        <Avatar />
        <Body>
          <InfoText>{author.name}</InfoText>
          <VerticalDot>
            <InfoText>·</InfoText>
          </VerticalDot>
          <InfoTextDate> {dateString}</InfoTextDate>
        </Body>
      </Group>
    );
  }
}

export default Info;
