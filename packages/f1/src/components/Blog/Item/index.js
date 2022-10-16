import React from "react";
import { connect, css, styled } from "frontity";
import Link from "@material-ui/core/Link";

import Info from "../../Info/index";

const Article = styled.article`
  max-width: 771px;
  width: 100%;
  margin: 0 auto 3.5rem;
  padding: 15px 15px 25px;
  border-radius: 10px;
  border: none !important;
`;

const Image = styled.img`
  border-radius: 0.375rem;
  box-shadow: 2px 5px 10px #00000073 !important;
  margin-bottom: 1.5rem;
  max-width: 100%;
  width: 100%;
  margin-left: auto;
  display: block;
  margin-right: auto;
  @media (min-width: 768px) {
    width: 75%;
  }
`;

const Header = styled.a`
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
  transition: 250ms ease;
`;

const InfoText = styled.span`
  color: #555;
  font-weight: 400;
  text-transform: capitalize;
  font-size: 15px;
  line-height: 2.25rem;
  font-family: "Inter", -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

const readMoreLink = css`
  border-radius: 6px;
  color: #fff !important;
  background-color: #00d07e;
  border-color: #00d07e;
  box-shadow: none;
  display: none;
  padding: 1.25rem;
  text-align: center;
  margin-top: 1.625rem;
`;

const Excerpt = styled.div`
  line-height: 1.6em;
  font-size: 15px !important;
`;

const Item = ({ state, item }) => {
  const author = state.source.author[item.author];
  const { featured_image_src, title, date } = item;

  const PostLink = (props) => <Link link={item.link} {...props} />;

  return (
    <Article>
      <PostLink>
        <Image src={featured_image_src} />
      </PostLink>
      <Header>
        <PostLink>
          <Title dangerouslySetInnerHTML={{ __html: title.rendered }} />
        </PostLink>
        <Info author={author} InfoText={InfoText} date={date} />
      </Header>

      {/* If the post has an excerpt (short summary text), we render it */}
      {item.excerpt && (
        <Excerpt dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }} />
      )}
      <PostLink css={readMoreLink}>Leer más →</PostLink>
    </Article>
  );
};

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";

const StyledCard = styled(Card)`
  margin: 0 auto 3.5rem;
  border: none !important;
  border-radius: 10px !important;
  box-shadow: 0 100px 80px rgb(70 125 249 / 4%),
    0 41.7776px 33.4221px rgb(70 125 249 / 3%),
    0 22.3363px 17.869px rgb(70 125 249 / 2%),
    0 12.5216px 10.0172px rgb(70 125 249 / 2%),
    0 6.6501px 5.32008px rgb(70 125 249 / 2%),
    0 2.76726px 2.21381px rgb(70 125 249 / 1%);
  .postExcerptCard p {
    font-size: 18px !important;
    line-height: 1.4rem !important;
  }
  .postTitleCard {
    font-size: 1.5rem !important;
    font-weight: 800 !important;
    line-height: normal !important;
  }
  &:hover {
    box-shadow: 0 100px 80px rgb(0 0 0 / 6%),
      0 41.7776px 33.4221px rgb(0 0 0 / 5%),
      0 22.3363px 17.869px rgb(0 0 0 / 4%),
      0 12.5216px 10.0172px rgb(0 0 0 / 4%),
      0 6.6501px 5.32008px rgb(0 0 0 / 4%),
      0 2.76726px 2.21381px rgb(0 0 0 / 3%);
  }
`;

const StyledLink = styled(Link)`
  &:hover {
    color: ${(props) => props.theme.palette.primary.main};
  }
`;

const ItemNew = ({ state, item }) => {
  const { featured_media, title, date } = item;
  const author = state.source.author[item.author];
  const media = state.source.attachment[featured_media];
  const srcset =
    Object.values(media.media_details.sizes)
      // Get the url and width of each size.
      .map((it) => [it.source_url, it.width])
      // Recude them to a string with the format required by `srcset`.
      .reduce(
        (final, current, index, array) =>
          final.concat(
            `${current.join(" ")}w${index !== array.length - 1 ? ", " : ""}`
          ),
        ""
      ) || undefined;
  const theme = useTheme();

  return (
    <StyledCard variant="outlined">
      {featured_media && (
        <Link href={item.link} underline="none">
          <CardMedia
            component="img"
            alt={media.title.rendered}
            height="200"
            image={media.source_url}
            srcSet={srcset}
          />
        </Link>
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          <StyledLink
            href={item.link}
            underline="none"
            color="inherit"
            theme={theme}
            className={"postTitleCard"}
          >
            {title.rendered}
          </StyledLink>
        </Typography>
        <Info author={author} InfoText={InfoText} date={date} />
        <Typography
          className={"postExcerptCard"}
          variant="body2"
          color="textSecondary"
          component="p"
          dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }}
        />
      </CardContent>
    </StyledCard>
  );
};

// Connect the Item to gain access to `state` as a prop
export default connect(ItemNew);
