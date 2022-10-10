import React, { useEffect } from "react";
import { connect, styled, Head } from "frontity";

import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';

import Item from "../Item";
import Container from "../../ContainerLarge";

const List = ({ state, actions }) => {
  const { items } = state.source.get("all-categories/");
  const fetchAndSetData = () => {
    items.forEach(async (item) => await actions.source.fetch(item.link));
  };

  useEffect(() => {
    fetchAndSetData();
  }, []);

  const data = items.map((item) => state.source.get(item.link));

  return (
    <Container>
      {data.map((categoryData, index) => {
        if (
          !categoryData ||
          !categoryData.items ||
          categoryData.items.length === 0
        )
          return null;

        return (
          <React.Fragment key={categoryData.id}>
            <Title variant="h3" component="h2" gutterBottom>{items[index].name}</Title>
            <Grid container spacing={3}>
              {categoryData.items.map(({ type, id }) => {
                const item = state.source[type][id];
                return (
                  <Grid key={item.id} item xs={12} md={4}>
                    <Item item={item} />
                  </Grid>
                );
              })}
            </Grid>
          </React.Fragment>
        );
      })}
    </Container>
  );
};

export default connect(List);

const Title = styled(Typography)`
  font-weight: 700 !important;
`;
