import React, { Component } from "react";
import { Avatar } from "@material-ui/core";
import { styled, css } from "frontity";

const color = "white";

const AuthorGroup = styled.div`
  margin-top: 0.9375rem;
  color: ${color};
  display: flex;
`;

const Name = styled.h2`
  letter-spacing: -0.02rem;
  font-weight: 700;
  color: ${color};
  font-size: 1rem;
  margin-bottom: 0;
  line-height: 1.2;
`;

const Title = styled.span`
  line-height: 1.4;
  font-size: 0.8rem;
  font-style: italic;
`;

const Body = styled.div`
  margin-left: 1rem;
`;

const avatarSize = "3.4375rem";
const avatarStyles = css`
  width: ${avatarSize};
  height: ${avatarSize};
`;

export class Author extends Component {
  render() {
    const { image, name, title } = this.props;
    return (
      <AuthorGroup>
        <Avatar src={image} variant="circular" css={avatarStyles} />
        <Body>
          <Name>{name}</Name>
          <Title>{title}</Title>
        </Body>
      </AuthorGroup>
    );
  }
}

export default Author;
