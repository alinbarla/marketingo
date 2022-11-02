import React from "react";
import { connect, styled } from "frontity";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";

import HubPostItem from "./HubPostItem";
import HubSidebar from "./HubSidebar";
import HubHeader from "./HubHeader";
import breakpoints from "../../constants/breakpoints";

const HubArchiveByCategoriaHub = ({ state, actions }) => {
  const data = state.source.get(state.router.link);
  if (!data || !data.items) return null;

  const categoria_hub = state.source.categoria_hub[data.id];

  const [itemsList, setItemsList] = React.useState([]);
  const [nextLink, setNextLink] = React.useState("");
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.md})`);

  React.useEffect(() => {
    setNextLink(data.next);
    setItemsList(data.items);
  }, [data.items]);

  const handleClickMore = async (e) => {
    e.preventDefault();
    await actions.source.fetch(nextLink);
    const nextData = state.source.get(nextLink);
    setNextLink(nextData.next);
    setItemsList((i) => [...i, ...nextData.items]);
  };

  return (
    <>
      <HubHeader categoriaHubName={categoria_hub.name} />
      <Container maxWidth="lg">
        <MainGrid container spacing={1}>
          {!isMobile && (
            <ExtraGrid item xs={12} md={3}>
              <HubSidebar />
            </ExtraGrid>
          )}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              {itemsList.map(({ id }) => {
                return (
                  <Grid key={id} item xs={12} md={4}>
                    <HubPostItem id={id} />
                  </Grid>
                );
              })}
            </Grid>
            {nextLink && (
              <Box display="flex" justifyContent="center" mt="1rem">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClickMore}
                >
                  Load More Posts
                </Button>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={1}>
            {isMobile && (
              <>
                <Divider />
                <HubSidebar />
              </>
            )}
          </Grid>
        </MainGrid>
      </Container>
    </>
  );
};

export default connect(HubArchiveByCategoriaHub);

const MainGrid = styled(Grid)`
  margin-bottom: 2rem !important;
`;

const ExtraGrid = styled(Grid)`
  @media (max-width: ${breakpoints.md}) {
    height: 0px !important;
    width: 0px !important;
    padding: 0 !important;
    margin: 0 !important;
  }
`;
