import React from "react";
import { connect, styled } from "frontity";
import StackedCard from "./StackedCard";
import { CardActions, CardContent, Typography } from "@material-ui/core";

const HubItem = ({ state, actions, item, name }) => {
  if (!item) return null;
  const cardCount = item.items.length;

  const handleClick = (e) => {
    e.preventDefault();
    actions.router.set(item.link);
    window.scrollTo(0, 0);
    document.body.focus();
  };

  return (
    <HubStackedCard
      variant="outlined"
      childCount={cardCount}
      onClick={handleClick}
    >
      <CardContent>
        <Typography className={"postTitleCard"} variant="h4" component="h2">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography className={"postCount"}>{cardCount} Articoli</Typography>
      </CardActions>
    </HubStackedCard>
  );
};

export default connect(HubItem);

const HubStackedCard = styled(StackedCard)`
  cursor: pointer;
  margin: 0 auto 3.5rem;
  border: none !important;
  border-radius: 10px !important;
  .postTitleCard {
    font-weight: 800 !important;
    line-height: normal !important;
  }
  .postCount {
    color: #2c3f50;
    text-decoration: underline;
    font-weight: 400;
  }
  min-width: 300px;
  min-height: 150px;
`;
