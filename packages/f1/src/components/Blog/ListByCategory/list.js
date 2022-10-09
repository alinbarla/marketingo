import React, { useEffect } from "react";
import { connect, styled, Head } from "frontity";

import Grid from "@material-ui/core/Grid";

import Item from "./Item";
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
      <Head>
        <title>Remarketingo</title>
      </Head>
      {data.map((categoryData, index) => {
        if (
          !categoryData ||
          !categoryData.items ||
          categoryData.items.length === 0
        )
          return null;

        return (
          <React.Fragment key={categoryData.id}>
            <Title>{items[index].name}</Title>
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

const Title = styled.h1`
  margin-bottom: 0.9375rem;
  letter-spacing: 0.0625rem;
  line-height: 2.6125rem;
  font-weight: 1000;
`;
