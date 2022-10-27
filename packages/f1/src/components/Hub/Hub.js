import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import HubItem from "./HubItem";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "../ContainerLarge";
import HubHeader from "./HubHeader";

const Hub = ({ state, actions }) => {
  const { items } = state.source.get("all-categoria-hub/");
  const fetchAndSetData = () => {
    items.forEach(async (item) => await actions.source.fetch(item.link));
  };

  useEffect(() => {
    fetchAndSetData();
  }, []);

  const data = items.map((item) => state.source.get(item.link));
  if (!data) return null;

  return (
    <>
      <HubHeader />
      <Container  maxWidth="lg">
        <HubGrid container spacing={5}>
          {data.map((categoriaHubData, index) => {
            if (!categoriaHubData || !categoriaHubData.items) return null;

            return (
              <Grid
                key={`hub-item-${items[index].name}-${index}`}
                item
                xs={12}
                md={4}
              >
                <HubItem item={categoriaHubData} name={items[index].name} />
              </Grid>
            );
          })}
        </HubGrid>
      </Container>
    </>
  );
};

export default connect(Hub);

const Title = styled(Typography)`
  font-weight: 700 !important;
`;

const HubGrid = styled(Grid)`
  margin-bottom: 4rem !important;
`;
