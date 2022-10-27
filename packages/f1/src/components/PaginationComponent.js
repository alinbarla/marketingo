import React from "react";

import Box from '@material-ui/core/Box';
import Link from "@material-ui/core/Link";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

import { connect, styled } from "frontity";

const PaginationComponent = ({ state, libraries }) => {
  const { totalPages } = state.source.get(state.router.link);
  const { path, page, query } = libraries.source.parse(state.router.link);

  return (
    <Box display={"flex"} justifyContent={"center"} mb={"1rem"}>
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

export default connect(PaginationComponent);
