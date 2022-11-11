import React from "react";
import { connect, styled } from "frontity";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Item from "../Item";
import Pagination from "../../PaginationComponent";
import Container from "../../ContainerLarge";
import ExtraDiv from "../../ExtraDiv";

const checkCategoryOrCategoriaHub = (path) => {
  const pathArray = path.split("/");
  if (pathArray[1] === "categoria_hub") {
    return { isCategoriaHub: true, isCategory: false };
  }
  if (pathArray[1] === "category") {
    return { isCategoriaHub: false, isCategory: true };
  }
  return { isCategoriaHub: false, isCategory: false };
};

const List = ({ state, libraries }) => {
  const data = state.source.get(state.router.link);

  if (!data || !data.items) return null;

  const { isCategoriaHub, isCategory } = checkCategoryOrCategoriaHub(
    state.router.link
  );

  return (
    <ExtraDiv>
      <Container>
        <Title variant="h3" component="h2" gutterBottom>
          {isCategory && state.source.category[data.id].name}
          {isCategoriaHub && state.source.categoria_hub[data.id].name}
        </Title>
        <Grid container spacing={3}>
          {data.items.map(({ type, id }) => {
            const item = state.source[type][id];
            return (
              <Grid key={item.id} item xs={12} md={4}>
                <Item item={item} />
              </Grid>
            );
          })}
        </Grid>
        <Pagination />
      </Container>
    </ExtraDiv>
  );
};

export default connect(List);

const Title = styled(Typography)`
  font-weight: 700 !important;
`;
