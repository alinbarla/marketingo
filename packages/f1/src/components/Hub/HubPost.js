import React from "react";
import { connect, styled } from "frontity";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";

import breakpoints from "../../constants/breakpoints";
import HubPostSidebar from "./HubPostSidebar";
import { ArrowRightIcon } from "./HubIcons";

const HubPost = ({ state, libraries }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  // Get the data of the post.
  const post = state.source[data.type][data.id];
  const Html2React = libraries.html2react.Component;
  const categoriaHub =
    post.categoria_hub && state.source.categoria_hub[post.categoria_hub[0]];
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.md})`);

  return (
    <>
      {!isMobile && (
        <BreadcrumbsHub
          categoriaHubName={categoriaHub.name}
          categoriaHubLink={categoriaHub.link}
          postName={post.title.rendered}
        />
      )}
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <ExtraGrid item xs={12} md={3}>
            {!isMobile && (
              <HubPostSidebar
                name={categoriaHub.name}
                link={categoriaHub.link}
              />
            )}
          </ExtraGrid>
          <Grid item xs={12} md={8}>
            <Html2React html={post.content.rendered} />
          </Grid>
          <Grid item xs={12} md={1}>
            {isMobile && (
              <>
                <Divider />
                <HubPostSidebar
                  name={categoriaHub.name}
                  link={categoriaHub.link}
                />
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default connect(HubPost);

const BreadcrumbsHub = ({ categoriaHubName, categoriaHubLink, postName }) => {
  return (
    <div
      style={{
        paddingTop: "1.25rem",
        paddingBottom: "1.25rem",
        borderBottom: "2px solid #f2f2f2",
      }}
    >
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        <StyledBreadcrumbs
          aria-label="breadcrumb"
          separator={<ArrowRightIcon fontSize="small" />}
        >
          <Link href="/hub/" color="inherit" underline="none">
            <Typography color="inherit">Hub</Typography>
          </Link>
          <Link href={categoriaHubLink} color="inherit" underline="none">
            <Typography color="inherit">{categoriaHubName}</Typography>
          </Link>
          <Typography className={"active"} color="inherit">
            {postName}
          </Typography>
        </StyledBreadcrumbs>
      </div>
    </div>
  );
};

const StyledBreadcrumbs = styled(Breadcrumbs)`
  color: #4a66f7 !important;
  list-style-type: none !important;
  padding: 0 !important;
  font-size: 1.125rem !important;
  .MuiTypography-body1 {
    font-size: 1.125rem !important;
  }
  .active {
    color: #b5b5b5 !important;
  }
`;

const ExtraGrid = styled(Grid)`
  @media (max-width: ${breakpoints.md}) {
    height: 0px !important;
    width: 0px !important;
    padding: 0 !important;
    margin: 0 !important;
  }
`;
