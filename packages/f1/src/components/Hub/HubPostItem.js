import React from "react";
import { connect, styled } from "frontity";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";

import StyledCard from "../StyledCard";
import StyledLink from "../StyledLink";

const colorArr = [
  "red",
  "black",
  "yellow",
  "acqua",
  "cream",
  "orange",
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
        <Title gutterBottom variant="h5" component="h2">
          {hubPost.title.rendered}
        </Title>
      </CardContent>
    </RandomColorStyledCard>
  );
};

export default connect(HubPostItem);

const RandomColorStyledCard = styled(StyledCard, {
  shouldForwardProp: (prop) => prop !== "bgColor",
})`
  background: ${(props) => props.bgColor} !important;
  max-width: 300px !important;
  max-height: 150px !important;
  text-align: center !important;
  margin-bottom: 1rem !important;
`;

const Title = styled(Typography)`
  font-size: 16px !important;
  line-height: 24px !important;
  font-weight: 700 !important;;
  opacity: 0.95 !important;
  color: white;
`;
