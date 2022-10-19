import React from "react";
import { connect, styled } from "frontity";
import Link from "@material-ui/core/Link";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";

import Info from "../../Info/index";
import StyledCard from "../StyledCard";
import StyledLink from "../StyledLink";

const InfoText = styled.span`
  color: #555;
  font-weight: 400;
  text-transform: capitalize;
  font-size: 15px;
  line-height: 2.25rem;
  font-family: "Inter", -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

const Item = ({ state, actions, item }) => {
  const { featured_media, title, date } = item;
  const author = state.source.author[item.author];
  const media = state.source.attachment[featured_media];
  const srcset =
    media &&
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
      );
  const theme = useTheme();

  const handleCardClick = (e, link) => {
    e.preventDefault();
    actions.router.set(link);
    window.scrollTo(0, 0);
    document.body.focus();
  };

  return (
    <StyledCard
      variant="outlined"
      onClick={(e) => handleCardClick(e, item.link)}
    >
      {state.theme.featured.showOnList && featured_media && (
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
            colorLink={theme.palette.primary.main}
            className={"postTitleCard"}
          >
            {title.rendered}
          </StyledLink>
        </Typography>
        <Info author={author} InfoText={InfoText} date={date} />
        {item.excerpt && (
          <Typography
            className={"postExcerptCard"}
            variant="body2"
            color="textSecondary"
            component="p"
            dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }}
          />
        )}
      </CardContent>
    </StyledCard>
  );
};

// Connect the Item to gain access to `state` as a prop
export default connect(Item);
