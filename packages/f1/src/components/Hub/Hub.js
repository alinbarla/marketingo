import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import HubItem from "./HubItem";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "../ContainerLarge";
import HubHeader from "./HubHeader";
import ExtraDiv from "../ExtraDiv";

const Hub = ({ state, actions }) => {
  const { items } = state.source.get(state.router.link);
  const fetchAndSetData = () => {
    items.forEach(async (item) => await actions.source.fetch(item.link));
  };

  useEffect(() => {
    fetchAndSetData();
  }, []);

  const data = items.map((item) => state.source.get(item.link));
  if (!data) return null;

  return (
    <ExtraDiv>
      <HubHeader />
      <Container maxWidth="lg">
        <HubGrid container spacing={5}>
          {data.map((categoriaHubData, index) => {
            if (!categoriaHubData || !categoriaHubData.items) return null;
            console.log(categoriaHubData);

            return (
              <Grid
                key={`hub-item-${items[index].id}-${index}`}
                item
                xs={12}
                md={4}
              >
                <HubItem item={categoriaHubData} />
              </Grid>
            );
          })}
        </HubGrid>
      </Container>
    </ExtraDiv>
  );
};

export default connect(Hub);

const Title = styled(Typography)`
  font-weight: 700 !important;
`;

const HubGrid = styled(Grid)`
  margin-bottom: 4rem !important;
`;
