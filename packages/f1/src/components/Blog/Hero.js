import React from "react";
import { connect, styled } from "frontity";

import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";

import Info from "../Info/index";
import Container from "../ContainerLarge";
import breakpoints from "../../constants/breakpoints";
import StyledCard from "./StyledCard";

const FeaturedCard = connect(
  ({ item, showMedia = false, state, actions, ...props }) => {
    if (!item) return null;
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
    const handleCardClick = (e, link) => {
      e.preventDefault();
      actions.router.set(link);
      window.scrollTo(0, 0);
      document.body.focus();
    };

    return (
      <ExtraStyledCard
        onClick={(e) => handleCardClick(e, item.link)}
        {...props}
      >
        {showMedia && featured_media && (
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
          <StyledInfo author={author} InfoText={InfoText} date={date} />
        </CardContent>
      </ExtraStyledCard>
    );
  }
);

const Hero = ({ state, actions }) => {
  const data = state.source.get(state.router.link);
  const featuredList = !data.items ? [] : data.items.slice(0, 3);
  const featuredItemList = React.useMemo(
    () => featuredList.map(({ type, id }) => state.source[type][id]),
    [featuredList]
  );

  return (
    <Section>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <FeaturedCard
              item={featuredItemList[0]}
              showMedia={state.theme.featured.showOnList}
            />
          </Grid>
          <MobileGridHero
            item
            xs={12}
            md={5}
            container
            direction="row"
            spacing={2}
          >
            <Grid item xs={12}>
              <FeaturedCard state={state} item={featuredItemList[1]} />
            </Grid>
            <Grid item xs={12}>
              <FeaturedCard state={state} item={featuredItemList[2]} />
            </Grid>
          </MobileGridHero>
        </Grid>
      </Container>
    </Section>
  );
};

export default connect(Hero);

const StyledInfo = styled(Info)`
  margin-bottom: 0;
`;

const ExtraStyledCard = styled(StyledCard)`
  height: 100%;
  width: 100%;
  margin: 0;
`;

const StyledLink = styled(Link)`
  &:hover {
    color: ${(props) => props.theme.palette.primary.main};
  }
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

const Section = styled.section`
  margin-bottom: 5rem;
  @media (min-width: ${breakpoints.md}) {
    margin-top: 3rem;
  }
`;

const MobileGridHero = styled(Grid)`
  @media (max-width: ${breakpoints.md}) {
    margin-left: 0 !important;
    margin-right: 0 !important;
    .MuiGrid-item {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }
`;
