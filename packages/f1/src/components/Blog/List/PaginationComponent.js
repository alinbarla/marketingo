import React from "react";

import Link from "@material-ui/core/Link";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

import { connect, styled } from "frontity";

const PaginationComponent = ({ state, libraries }) => {
  const { totalPages } = state.source.get(state.router.link);
  const { path, page, query } = libraries.source.parse(state.router.link);

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Pagination
        page={page}
        count={totalPages}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            href={libraries.source.stringify({ path, page: item.page, query })}
            {...item}
          />
        )}
      />
    </Box>
  );
};

const Box = styled.div`
  display: ${(props) => props.display};
  justify-content: ${(props) => props.justifyContent};
  margin-bottom: 2rem;
`;

export default connect(PaginationComponent);
