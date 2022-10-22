import React from "react";
import { connect, styled } from "frontity";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";

import StyledCard from "../StyledCard";
import StyledLink from "../StyledLink";

const colorArr = [
  "#fee4cb",
  "#e5e2ff",
  "#ffd3e1",
  "#c7f7dc",
  "#fdfdbd",
  "#ff8787",
];

const getRandomColor = () => {
  return colorArr[Math.floor(Math.random() * colorArr.length)];
};

const HubPostItem = ({ state, actions, id }) => {
  const hubPost = state.source.hub[id];
  if (!hubPost) return null;
  const theme = useTheme();

  const handleCardClick = (e, link) => {
    e.preventDefault();
    actions.router.set(link);
    window.scrollTo(0, 0);
    document.body.focus();
  };

  return (
    <RandomColorStyledCard
      variant="outlined"
      bgColor={getRandomColor()}
      onClick={(e) => handleCardClick(e, hubPost.link)}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          <StyledLink
            href={hubPost.link}
            underline="none"
            color="inherit"
            colorLink={theme.palette.primary.main}
            className={"postTitleCard"}
          >
            {hubPost.title.rendered}
          </StyledLink>
        </Typography>
      </CardContent>
    </RandomColorStyledCard>
  );
};

export default connect(HubPostItem);

const RandomColorStyledCard = styled(StyledCard, {
  shouldForwardProp: (prop) => prop !== "bgColor",
})`
  background-color: ${(props) => props.bgColor} !important;
  min-width: 300px !important;
  min-height: 150px !important;
`;
