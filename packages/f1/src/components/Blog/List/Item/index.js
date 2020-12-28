import React from "react";
import { connect, css, styled } from "frontity";
import Link from "@frontity/components/link";
import { Avatar } from "@material-ui/core";

import FeaturedMedia from "../../../featured-media";
import avatarImage from "./avatar.jpg";

const Article = styled.article`
  max-width: 771px;
  width: 100%;
  margin: 0 auto 3.5rem;
  padding: 15px 15px 25px;
  border: 1px solid #e7ebed;
  border-radius: 10px;
`;

const Image = styled.img`
  border-radius: 0.375rem;
  box-shadow: 2px 5px 10px #00000073 !important;
  margin-bottom: 1.5rem;
  max-width: 100%;
  width: 100%;
`;

const Header = styled.div`
  margin-bottom: 4.6875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 0.9375rem;
  text-align: center;
  letter-spacing: 0.0625rem;
  line-height: 2.6125rem;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
`;

const avatarStyles = css`
  border-color: #e7ebed;
  border-width: 0.1875rem;
  margin-right: 0.9375rem;
`;

const InfoText = styled.div`
  color: #555;
`;

const readMoreLink = css`
  border-radius: 6px;
  color: #fff !important;
  background-color: #00d07e;
  border-color: #00d07e;
  box-shadow: none;
  display: block;
  padding: 1.25rem;
  text-align: center;
  margin-top: 1.625rem;
`;

const Excerpt = styled.div`
  line-height: 1.6em;
`;

const Item = ({ state, item }) => {
  const author = state.source.author[item.author];
  const { featured_image_src, title } = item;
  const date = new Date(item.date);
  const dateString = date.toLocaleDateString("es-MX", {
    month: "short",
    year: "numeric",
    day: "numeric",
  });

  return (
    <Article>
      <Image src={featured_image_src} />
      <Header>
        <Title dangerouslySetInnerHTML={{ __html: title.rendered }} />
        <Info>
          <Avatar css={avatarStyles} src={avatarImage} />
          <InfoText>{author.name}</InfoText>
          <InfoText>.</InfoText>
          <InfoText>{dateString}</InfoText>
        </Info>
      </Header>

      {/* If the post has an excerpt (short summary text), we render it */}
      {item.excerpt && (
        <Excerpt dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }} />
      )}
      <Link link={item.link} css={readMoreLink}>
        Leer más →
      </Link>
    </Article>
  );
};

// Connect the Item to gain access to `state` as a prop
export default connect(Item);
