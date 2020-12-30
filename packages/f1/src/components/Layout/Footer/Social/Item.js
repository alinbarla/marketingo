import React from "react";
import { styled } from "frontity";

const Link = styled.a`
  & + & {
    margin-left: 1.875rem;
  }
`;

const imageSize = "3.75rem";
const Image = styled.img`
  width: ${imageSize};
  height: ${imageSize};
`;

const Item = ({ src, alt, href }) => {
  return (
    <Link href={href}>
      <Image src={src} alt={alt} />
    </Link>
  );
};

export default Item;
