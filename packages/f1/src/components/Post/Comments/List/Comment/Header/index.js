import React from "react";
import { styled } from "frontity";

import Avatar from "./Avatar";
import breakpoints from "../../../../../../constants/breakpoints";

const HeaderContainer = styled.div`
  display: flex;
  margin-bottom: 1.25rem;
`;

const Link = styled.a`
  text-decoration: none;
`;

const Name = styled.h4`
  font-size: 1.125rem;
  font-weight: 900;
  color: #555;
  margin-top: 0.4375rem;

  @media (min-width: ${breakpoints.md}) {
    font-size: 1.3rem;
  }
`;

const getResolutionAsNumber = (resolution) => parseInt(resolution);

const getResolutions = (author_avatar_urls) => {
  const resolutionKeys = Object.keys(author_avatar_urls);
  return resolutionKeys.map(getResolutionAsNumber);
};

const getMaxResolution = (author_avatar_urls) => {
  const resolutions = getResolutions(author_avatar_urls);
  const resolutionNumber = Math.max(...resolutions);
  return resolutionNumber.toString();
};

const getAvatarUrl = (author_avatar_urls) => {
  if (!author_avatar_urls) return null;
  const highestResolution = getMaxResolution(author_avatar_urls);
  return author_avatar_urls[highestResolution];
};

const Header = ({ name, site, avatar }) => {
  const avatarUrl = getAvatarUrl(avatar);
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
