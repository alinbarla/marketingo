import React from "react";
import { connect, styled } from "frontity";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import breakpoints from "../../constants/breakpoints";
import HubPostSidebar from "./HubPostSidebar";

const HubPost = ({ state, libraries }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  // Get the data of the post.
  const post = state.source[data.type][data.id];
  const Html2React = libraries.html2react.Component;
  const categoriaHub =
    post.categoria_hub && state.source.categoria_hub[post.categoria_hub[0]];
  const isMobile = useMediaQuery(`max-width: ${breakpoints.md}`);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={5}>
        <ExtraGrid item xs={12} md={3}>
          {!isMobile && (
            <HubPostSidebar name={categoriaHub.name} link={categoriaHub.link} />
          )}
        </ExtraGrid>
        <Grid item xs={12} md={8}>
          <Html2React html={post.content.rendered} />
        </Grid>
        <Grid item xs={12} md={1}>
          {isMobile && (
            <HubPostSidebar name={categoriaHub.name} link={categoriaHub.link} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default connect(HubPost);

const ExtraGrid = styled(Grid)`
  @media (max-width: ${breakpoints.md}) {
    height: 0px !important;
    width: 0px !important;
    padding: 0 !important;
    margin: 0 !important;
  }
`;
