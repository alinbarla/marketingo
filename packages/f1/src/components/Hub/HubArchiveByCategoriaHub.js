import React from "react";
import { connect, styled } from "frontity";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Pagination from "../PaginationComponent";
import Container from "@material-ui/core/Container";
import HubPostItem from "./HubPostItem";
import HubSidebar from "./HubSidebar";
import breakpoints from "../../constants/breakpoints";

const HubArchiveByCategoriaHub = ({ state }) => {
  const data = state.source.get(state.router.link);
  if (!data || !data.items) return null;

  return (
    <Container maxWidth="lg">
      <Grid container spacing={5}>
        <ExtraGrid item xs={12} md={1}></ExtraGrid>
        <Grid item xs={12} md={8}>
          <Title variant="h3" component="h2" gutterBottom>
            {state.source.categoria_hub[data.id].name}
          </Title>
          <Grid container spacing={3}>
            {data.items.map(({ id }) => {
              return (
                <Grid key={id} item xs={12} md={4}>
                  <HubPostItem id={id} />
                </Grid>
              );
            })}
          </Grid>
          <Pagination />
        </Grid>
        <Grid item xs={12} md={3}>
          <HubSidebar />
        </Grid>
      </Grid>
    </Container>
  );
};

export default connect(HubArchiveByCategoriaHub);

const Title = styled(Typography)`
  font-weight: 700 !important;
`;

const ExtraGrid = styled(Grid)`
  @media (max-width: ${breakpoints.md}) {
    height: 0px !important;
    width: 0px !important;
    padding: 0 !important;
    margin: 0 !important;
  }
`;
