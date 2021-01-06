import React from "react";
import { styled } from "frontity";

import Avatar from "./Avatar";

const HeaderContainer = styled.div`
  display: flex;
  margin-bottom: 1.25rem;
`;

const Link = styled.a`
  text-decoration: none;
`;

const Name = styled.h4`
  font-size: 1.3rem;
  font-weight: bold;
`;

const getAvatarUrl = (author_avatar_urls) => {
  if (!author_avatar_urls) return null;
  const resolutions = Object.keys(author_avatar_urls);
  const highestResolution = Math.max(resolutions);
  return author_avatar_urls[highestResolution];
};

const Header = ({ name, site, author_avatar_urls }) => {
  const avatarUrl = getAvatarUrl(author_avatar_urls);
  return (
    <HeaderContainer>
      <Avatar avatar={avatarUrl} name={name} />
      <Link href={site}>
        <Name>{name}</Name>
      </Link>
    </HeaderContainer>
  );
};

export default Header;
