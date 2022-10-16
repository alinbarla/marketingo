import React from "react";
import { styled } from "frontity";

import Avatar from "./Avatar";

const Group = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  margin-bottom: 1rem;
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

const Info = ({author, InfoText, InfoTextDate=InfoText, date, ...props}) => {
  const getMonth = (date) => {
    const monthString = date.toLocaleDateString("it-IT", {
      month: "long",
    });
    return monthString;
  };

  const getDateString = () => {
    const dateObj = new Date(date);
    const month = getMonth(dateObj);
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <Group {...props}>
      <Avatar />
      <Body>
        <InfoText>{author.name}</InfoText>
        <VerticalDot>
          <InfoText>·</InfoText>
        </VerticalDot>
        <InfoTextDate> {getDateString()}</InfoTextDate>
      </Body>
    </Group>
  );
};

export default Info;
