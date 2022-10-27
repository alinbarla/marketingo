import React from "react";
import { connect, styled } from "frontity";

import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";

import { ArrowRightIcon } from "./HubIcons";
import breakpoints from "../../constants/breakpoints";

const HubHeader = ({ categoriaHubName }) => {
  return (
    <>
      <Header>
        <HeaderContent>
          <Container>
            <MiniContent>
              <TitleHub>{categoriaHubName ? categoriaHubName : "Hub"}</TitleHub>
            </MiniContent>
          </Container>
        </HeaderContent>
      </Header>
      <BreadcrumbsHub categoriaHubName={categoriaHubName} />
    </>
  );
};

export default connect(HubHeader);

const BreadcrumbsHub = ({ categoriaHubName }) => {
  return (
    <Box
      paddingTop="1.25rem"
      paddingBottom="1.25rem"
      borderBottom="2px solid #f2f2f2"
      marginBottom="2rem"
    >
      <Box maxWidth="1140px" margin="0 auto">
        <StyledBreadcrumbs
          aria-label="breadcrumb"
          separator={<ArrowRightIcon fontSize="small" />}
        >
          {categoriaHubName ? (
            <Link href="/hub/" color="inherit" underline="none">
              <Typography color="inherit">Hub</Typography>
            </Link>
          ) : (
            <Typography color="inherit">Hub</Typography>
          )}
          {categoriaHubName && (
            <Typography className="active" color="inherit">
              {categoriaHubName}
            </Typography>
          )}
        </StyledBreadcrumbs>
      </Box>
    </Box>
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
  @media (max-width: ${breakpoints.md}) {
    .MuiBreadcrumbs-ol {
      margin-left: 1rem;
    }
  }
`;

const Header = styled.header`
  background-color: #4a66f7;
  overflow: hidden;
  position: relative;
`;

const HeaderContent = styled.div`
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.8125rem;
  max-width: 1035px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem 2.8125rem 0 2.8125rem;
`;

const Container = styled.div`
  max-width: 50rem;
  margin: 0 auto;
  padding-top: 0;
`;

const MiniContent = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 680px;
  color: white;
`;

const TitleHub = styled.h1`
  color: #ffffff !important;
  font-weight: 500 !important;
  font-size: 2.1rem !important;
  line-height: normal !important;
`;
