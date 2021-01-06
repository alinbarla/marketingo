import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import Link from "@frontity/components/link";
import { getPostsFetchUrl } from "../../../utils/posts";

/**
 * Pagination Component
 *
 * It's used to allow the user to paginate between a list of posts.
 *
 * The `state`, `actions`, `libraries` props are provided by the global context,
 * when we wrap this component in `connect(...)`
 */

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Pagination = ({ state, actions }) => {
  // Get the total posts to be displayed based for the current link
  const postsFetchUrl = getPostsFetchUrl(state.router.link);
  const { next, previous } = state.source.get(postsFetchUrl);

  // Pre-fetch the the next page if it hasn't been fetched yet.
  useEffect(() => {
    if (next) actions.source.fetch(postsFetchUrl);
  }, []);

  const previousLink = previous === "/" ? "/blog/" : previous;

  return (
    <Toolbar>
      {/* If there's a next page, render this link */}
      {next && (
        <Link link={next}>
          <Text>← Older posts</Text>
        </Link>
      )}

      {previous && next && " - "}

      {/* If there's a previous page, render this link */}
      {previous && (
        <Link link={previousLink}>
          <Text>Newer posts →</Text>
        </Link>
      )}
    </Toolbar>
  );
};

/**
 * Connect Pagination to global context to give it access to
 * `state`, `actions`, `libraries` via props
 */
export default connect(Pagination);

const Text = styled.em`
  display: inline-block;
  margin-top: 16px;
`;
