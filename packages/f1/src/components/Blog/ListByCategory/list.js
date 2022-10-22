import React, { useEffect } from "react";
import { connect, styled, Head } from "frontity";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "../../StyledLink";
import { useTheme } from "@material-ui/core/styles";

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
  const theme = useTheme();

  return (
    <Container>
      {data.map((categoryData, index) => {
        if (
          !categoryData ||
          !categoryData.items ||
          categoryData.items.length === 0
        )
          return null;

        const categoryDataItemList = categoryData.items
          .slice(0, 3)
          .map(({ type, id }) => state.source[type][id]);

        return (
          <React.Fragment key={items[index].id}>
            <Typography component="h2" variant="h3" gutterBottom>
              <StyledLink
                href={items[index].link}
                underline="none"
                color="inherit"
                colorLink={theme.palette.primary.main}
                variant="h3"
              >
                {items[index].name}
              </StyledLink>
            </Typography>

            <Grid container spacing={3}>
              {categoryDataItemList.map((item) => {
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

const StyledLink = styled(Link)`
  font-weight: 700 !important;
`;
