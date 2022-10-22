import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import StyledCard from "../StyledCard";
import CardContent from "@material-ui/core/CardContent";
import { connect, styled } from "frontity";

const colorArr = [
  "#fee4cb",
  "#e5e2ff",
  "#ffd3e1",
  "#c7f7dc",
  "#fdfdbd",
  "#ff8787",
];

const getRandomColor = () => {
  return colorArr[Math.floor(Math.random() * colorArr.length)];
};

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
      {data.map((categoriaHubData, index) => {
        if (!categoriaHubData || !categoriaHubData.link) return null;

        return (
          <HubSidebarItem
            key={`hub-sidebar-item-${items[index].name}-${index}`}
            variant="outlined"
            bgColor={'white'}
            onClick={(e) => handleCardClick(e, categoriaHubData.link)}
          >
            <CardContent>
              <Typography className={"postTitleCard"}>
                {items[index].name}
              </Typography>
            </CardContent>
          </HubSidebarItem>
        );
      })}
    </>
  );
};

const HubSidebarItem = styled(StyledCard, {
  shouldForwardProp: (prop) => prop !== "bgColor",
})`
  background-color: ${(props) => props.bgColor} !important;
  min-width: 150px !important;
  min-height: 60px !important;
  text-align: center !important;
`;

const Title = styled(Typography)`
  font-weight: 700 !important;
  text-align: center !important;
`;

export default connect(HubSidebar);
