import React from "react";
import { css } from "frontity";
import BaseAvatar from "@material-ui/core/Avatar";
import { avatarSize, avatarMargin } from "./styles";

const avatarCss = css`
  width: ${avatarSize};
  height: ${avatarSize};
  margin-right: ${avatarMargin};
`;

const Avatar = ({ avatar, name }) => {
  return (
    <BaseAvatar src={avatar} alt={name} variant="circular" css={avatarCss} />
  );
};

export default Avatar;
