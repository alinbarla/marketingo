import React, { useEffect } from "react";
import { connect, styled } from "frontity";

import Item from "./Item";
import Container from "../../ContainerLarge";

const List = ({ state, actions }) => {
  // Get the data of the current list.
  const data = state.source.get("/");

  const fetchAndSetData = async () => {
    await actions.source.fetch("/");
  };

  useEffect(() => {
    fetchAndSetData();
  }, []);

  if (!data || !data.items) return null;

  let title = "Blog";
  if (data.isAwsmJobOpeningsArchive) {
    title = "Career";
  }

  return (
    <Container>
      <>
        {data.items.map(({ type, id }) => {
          const item = state.source[type][id];
          return <Item key={item.id} item={item} />;
        })}
      </>
    </Container>
  );
};

export default connect(List);
