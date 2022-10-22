import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { connect, styled } from "frontity";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { ArrowRightIcon } from "./HubIcons";

const HubSidebar = ({ state, actions }) => {
  const { items } = state.source.get("all-categoria-hub/");
  const fetchAndSetData = () => {
    items.forEach(async (item) => await actions.source.fetch(item.link));
  };

  useEffect(() => {
    fetchAndSetData();
  }, []);

  const handleCardClick = (e, link) => {
    e.preventDefault();
    actions.router.set(link);
    window.scrollTo(0, 0);
    document.body.focus();
  };

  const data = items.map((item) => state.source.get(item.link));
  if (!data) return null;

  return (
    <>
      <Title variant="h5" component="h3" gutterBottom>
        Categoria Hub List
      </Title>
      <ExtraGrid container spacing={3}>
        {data.map((categoriaHubData, index) => {
          if (!categoriaHubData || !categoriaHubData.link) return null;

          return (
            <Grid
              key={`hub-sidebar-item-${items[index].name}-${index}`}
              item
              xs={12}
            >
              <Button
                onClick={(e) => handleCardClick(e, categoriaHubData.link)}
                fullWidth
                startIcon={<ArrowRightIcon />}
              >
                {items[index].name}
              </Button>
            </Grid>
          );
        })}
      </ExtraGrid>
    </>
  );
};

const Title = styled(Typography)`
  font-weight: 700 !important;
  text-align: center !important;
`;

const ExtraGrid = styled(Grid)`
  text-align: center !important;
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
`;

export default connect(HubSidebar);
