import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { connect, styled } from "frontity";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { ArrowRightIcon, ArrowLeftIcon } from "./HubIcons";

const HubPostSidebar = ({ state, name, actions, link }) => {
  const { items } = state.source.get(link);
  const fetchAndSetData = async () => {
    await actions.source.fetch(link);
  };

  useEffect(() => {
    fetchAndSetData();
  }, []);
  if (!items) return null;

  const handleCardClick = (e, link) => {
    e.preventDefault();
    actions.router.set(link);
    window.scrollTo(0, 0);
    document.body.focus();
  };

  return (
    <>
      <Title
        variant="h5"
        component={Button}
        onClick={(e) => handleCardClick(e, "/hub/")}
        fullWidth
        startIcon={<ArrowLeftIcon />}
        gutterBottom
      >
        Return
      </Title>
      <ExtraGrid container spacing={3}>
        {items.map((item, index) => {
          return (
            <Grid key={`hub-post-sidebar-item-${name}-${index}`} item xs={12}>
              <Button
                onClick={(e) => handleCardClick(e, item.link)}
                fullWidth
                startIcon={<ArrowRightIcon />}
              >
                {state.source.hub[item.id].title.rendered}
              </Button>
            </Grid>
          );
        })}
      </ExtraGrid>
    </>
  );
};

export default connect(HubPostSidebar);

const Title = styled(Typography)`
  font-weight: 700 !important;
  text-align: center !important;
  margin-top: 1rem !important;
`;

const ExtraGrid = styled(Grid)`
  text-align: center !important;
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
`;
