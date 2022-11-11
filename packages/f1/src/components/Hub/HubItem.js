import React, { useState, useEffect } from "react";
import { connect, styled } from "frontity";
import StackedCard from "./StackedCard";
import { CardActions, CardContent, Typography } from "@material-ui/core";

const HubItem = ({ state, actions, item }) => {
  if (!item) return null;
  const [length, setLength] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    actions.router.set(item.link);
    window.scrollTo(0, 0);
    document.body.focus();
  };

  const getLength = async (next) => {
    if (next) {
      await actions.source.fetch(next);
      const data = state.source.get(next);
      setLength((i) => i + data.items.length);
      getLength(data.next);
    } else {
      if (!isReady) setIsReady(true);
    }
  };

  useEffect(() => {
    setLength(item.items.length);
    getLength(item.next);
  }, []);

  return (
    <HubStackedCard
      variant="outlined"
      childCount={length}
      onClick={handleClick}
    >
      <CardContent>
        <Typography className={"postTitleCard"} variant="h4" component="h2">
          {state.source.categoria_hub[item.id].name}
        </Typography>
      </CardContent>
      <CardActions>
        {isReady && <Typography className={"postCount"}>{length} Articoli</Typography>}
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
    font-weight: 600 !important;
    line-height: normal !important;
    color: #2c3f50;
    font-size: 30px;
    font-family: Avenir, Helvetica, Arial, sans-serif !important;
  }
  .postCount {
    color: #2c3f50;
    text-decoration: underline;
    font-weight: 400;
  }
  min-width: 300px;
  min-height: 150px;
`;
