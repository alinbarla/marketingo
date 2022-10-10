import React from "react";
import { connect, styled } from "frontity";

import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import SvgIcon from "@material-ui/core/SvgIcon";

import Link from "@material-ui/core/Link";
import FeaturedMedia from "../featured-media";
import Info from "../Info";
import CallToAction from "./CallToAction";
import Comments from "./Comments";
import breakpoints from "../../constants/breakpoints";

const Container = styled.div`
  max-width: 50rem;
  margin: 0 auto;
  padding-top: 1.25rem;
`;

const Main = styled.main`
  float: none;
  margin: 0 auto 140px;
  max-width: 680px;
`;

const headerMarginBottom = "2.8125rem";

const Header = styled.header`
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
  margin-bottom: ${headerMarginBottom};
  @media (max-width: ${breakpoints.xl}) {
    padding-top: 0rem;
  }
`;

const Title = styled.h1`
  margin-bottom: 1.2rem;
  width: 100% !important;
  text-shadow: 0 5px 10px rgba(14, 27, 35, 0.25);
  text-align: left;
  margin-top: 50px;
  color: black !important;
  line-height: 1.4 !important;
  font-weight: 800;
  letter-spacing: 0.2px;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !important;
  font-size: 1.875rem !important;

  @media (min-width: ${breakpoints.md}) {
    font-size: 2.45rem !important;
  }
`;

const ArticleContainer = styled.div`
  width: 100%;
  max-width: 1035px;
  margin: 0 auto;
  padding: 2.8125rem;
  .post-title {
    text-align: center;
  }
`;

const StyledLink = styled(Link)`
  color: inherit;
`;

const Author = styled.p`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
  display: inline;
`;

const DateWrapper = styled.p`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
  display: inline;
`;

const InfoText = styled.span`
  font-size: 1.3rem;
  color: black;
  text-transform: capitalize;
`;

const InfoTextDate = styled.span`
  font-size: 1rem;
  color: black;
  text-transform: capitalize;
`;

const StyledBreadcrumbs = styled(Breadcrumbs)`
  margin: 0 auto 0 0 !important;
  .MuiBreadcrumbs-ol {
    align-items: normal;
  }
`;

const NavigateNextIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
  </SvgIcon>
);

const Post = ({ state, actions, libraries }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  // Get the data of the post.
  const post = state.source[data.type][data.id];
  // Get the data of the author.
  const author = state.source.author[post.author];
  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  const fetchDataAndAddSmoothScroll = async () => {
    await actions.source.fetch(state.router.link);
    addLinkSmoothScroll();
  };

  const category = post.categories && state.source.category[post.categories[0]];

  // Load the post, but only if the data is ready.
  return data.isReady ? (
    <>
      <ArticleContainer>
        {/* Look at the settings to see if we should include the featured image */}
        {state.theme.featured.showOnPost && (
          <FeaturedMedia id={post.featured_media} />
        )}

        <Container>
          <Main>
            <Content>
              <Header>
                <StyledBreadcrumbs
                  aria-label="breadcrumb"
                  separator={<NavigateNextIcon fontSize="small" />}
                >
                  <Link href="/" color="inherit">
                    <Typography color="inherit">Blog</Typography>
                  </Link>
                  {category && (
                    <Link href={category.link} color="inherit">
                      <Typography color="inherit">{category.name}</Typography>
                    </Link>
                  )}
                  <Typography color="textPrimary">
                    {post.title.rendered}
                  </Typography>
                </StyledBreadcrumbs>
                <Title
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <Info
                  InfoText={InfoText}
                  InfoTextDate={InfoTextDate}
                  author={author}
                  date={post.date}
                />
              </Header>
              <Html2React html={post.content.rendered} />
            </Content>
          </Main>
        </Container>
      </ArticleContainer>
      <CallToAction />
      <Comments postId={data.id} />
    </>
  ) : null;
};

export default connect(Post);

/**
 * This component is the parent of the `content.rendered` HTML. We can use nested
 * selectors to style that HTML.
 */

const headerPadding = "2.8125rem";
const containerPadding = "1.25rem";
const encabezadoMarginBottom = "5rem";

const getBackgroundMargin = (backgroundHeight) =>
  `calc(-${backgroundHeight} - ${headerMarginBottom} - ${headerPadding} - ${containerPadding})`;

const getImageMargin = (marginTop) => `calc(
  -${headerMarginBottom} - ${encabezadoMarginBottom} + ${marginTop}
);`;

const Content = styled.div`
  word-break: break-word;
  position: relative;

  margin-left: auto;
  margin-right: auto;
  max-width: 680px;

  p {
    margin-bottom: 1.5rem;
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
      Roboto, "Helvetica Neue", Arial, sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #111;
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
      Roboto, "Helvetica Neue", Arial, sans-serif;
    font-weight: 900;
    line-height: 1.2;
    margin: 0 0 20px;
    text-decoration: none;
  }

  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
  }

  h1 {
    font-size: 56px;
    letter-spacing: -0.03em;
    line-height: 1;
  }

  h2 {
    font-size: 42px;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }

  h3 {
    color: #111;
    font-size: 28px;
    letter-spacing: -0.01em;
    line-height: 1.23;
  }

  h2,
  h3,
  h4 {
    margin-bottom: 20px;
    margin-top: 40px;
  }

  h4 {
    color: #000cff;
    font-size: 24px;
    line-height: 1.2;
  }

  h5,
  h6 {
    color: #000cff;
    font-size: 18px;
    letter-spacing: 0.1em;
    line-height: 1.5;
    text-transform: uppercase;
  }

  h6 {
    color: #555;
  }

  img {
    object-fit: cover;
    object-position: center;
    max-width: 100% !important;
  }

  figure {
    margin: 24px auto;
    /* next line overrides an inline style of the figure element. */
    // width: 100% !important;

    figcaption {
      font-size: 0.7em;
    }
  }

  iframe {
    display: block;
    margin: 0 auto;
  }

  blockquote {
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.1);
    border-left: 4px solid rgba(12, 17, 43);
    padding: 4px 16px;
  }
  .wp-block-embed {
    max-width: 100%;
    position: relative;
    width: 100%;
    margin: 1.5rem auto;
    .wp-block-embed__wrapper {
      &::before {
        content: "";
        display: block;
        padding-top: 56.25%;
      }
    }
    iframe {
      max-width: 100%;
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      border: 0;
    }
  }
  a {
    color: rgb(31, 56, 197);
    text-decoration: underline;
  }

  /* Input fields styles */

  input[type="text"],
  input[type="email"],
  input[type="url"],
  input[type="tel"],
  input[type="number"],
  input[type="date"],
  textarea,
  select {
    display: block;
    padding: 6px 12px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: var(--white);
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 4px;
    outline-color: transparent;
    transition: outline-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin: 8px 0 4px 0;

    &:focus {
      outline-color: #1f38c5;
    }
  }

  input[type="submit"] {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid #1f38c5;
    padding: 12px 36px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 4px;
    color: var(--white);
    background-color: var(--brand);
  }

  /* WordPress Core Align Classes */

  @media (min-width: 420px) {
    img.aligncenter,
    img.alignleft,
    img.alignright {
      width: auto;
    }

    .aligncenter {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    .alignright {
      float: right;
      margin-left: 24px;
    }

    .alignleft {
      float: left;
      margin-right: 24px;
    }
  }

  .alignfull {
    margin-left: calc(-100vw / 2 + 100% / 2);
    margin-right: calc(-100vw / 2 + 100% / 2);
    max-width: 100vw;

    a {
      text-decoration: none;
    }
  }

  .wrapper-tabla {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0 35% !important;
  }

  @media only screen and (max-width: 680px) {
    .wrapper-tabla {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding: 0 !important;
    }

    .card {
      width: 300px !important;
    }
  }

  @media only screen and (max-width: 1075px) and (min-width: 681px) {
    .card {
      width: 300px !important;
    }

    .wrapper-tabla {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding: 0 !important;
    }
  }

  .card {
    overflow: hidden;
    box-shadow: 0px 2px 20px var(--clr-gray-light);
    background: #fff;
    border-radius: 0.5rem;
    position: relative;
    width: 250px;
    margin: 1.5rem;
    transition: 0.25s all ease-in-out;
    cursor: pointer;
    box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.2);
  }

  .card:hover {
    box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.2);
  }

  .banner-img {
    position: absolute;
    object-fit: cover;
    height: 14rem;
    width: 100%;
  }

  .category-tag {
    font-size: 0.9rem !important;
    font-weight: 700;
    color: #fff;
    background: red;
    padding: 0 15px;
    text-transform: uppercase;
    position: absolute;
    z-index: 1;
    top: 13rem;
    border-radius: 0 50px 0 0;
  }

  .capitulo-number {
    background-color: #0beef9;
    background-image: linear-gradient(315deg, #0beef9 0%, #48a9fe 74%);
  }

  .card-body {
    margin: 16.5rem 1rem 1rem;
  }

  .capitulotitle {
    font-weight: 800;
    line-height: 1.3em;
    margin: 1rem 0 0.5rem;
    color: #3e4348;
    letter-spacing: 0px;
    text-transform: none;
    font-size: 1.6rem;
    text-decoration: none;
  }

  .capitulotitle:hover {
    text-decoration: none;
  }

  .leer-capitulo {
    font-size: 1rem !important;
    color: #3f51b5;
    font-weight: 400;
    display: inline;
    font-weight: 700;
    text-decoration: underline;
  }

  .encabezado {
    margin-bottom: ${encabezadoMarginBottom};
  }

  .encabezado-content {
    color: #fff;
    padding: 5px 5%;
    margin: auto !important;
    display: block !important;
    max-width: 980px !important;
  }

  .encabezado-title {
    color: #fff;
    margin-bottom: 80px;
    font-weight: 100;
    text-align: center;
    font-size: 3.2rem;
    border-bottom: 0.1px solid #fff;
    padding-bottom: 25px;
    line-height: 1.1;
  }

  .encabezado-chapter {
    text-transform: uppercase;
    display: block;
    text-align: center;
    font-size: 1rem;
    letter-spacing: 0.5px;
  }

  .encabezado-img-and-content {
    margin-bottom: 70px;
    margin-top: 70px;
  }

  @media only screen and (min-width: 600px) {
    .encabezado-img-and-content {
      display: flex;
      flex-wrap: wrap;
    }

    .encabezado-txt {
      max-width: 50%;
      flex: 0 0 50%;
    }

    .encabezado-img {
      flex: 0 0 50%;
      max-width: 50%;
    }
  }

  #entry-title-background {
    z-index: -999;
    min-height: 400px !important;
    margin-top: -20rem !important;

    @media (min-width: ${breakpoints.md}) {
      margin-top: ${getBackgroundMargin("10.5rem")};
    }
  }

  .primera {
    box-shadow: 2px 5px 10px #00000073;
    display: block !important;
    border-radius: 10px;
    margin-left: auto;
    margin-right: auto;
    margin-top: -150px;
    margin-bottom: 30px;

    @media (min-width: ${breakpoints.md}) {
      margin-top: ${getImageMargin("-3rem")};
      width: 80%;
    }
  }

  .img-c {
    box-shadow: rgba(0, 0, 0, 0.19) 0 10px 20px, rgba(0, 0, 0, 0.23) 0 6px 6px;
    margin-bottom: 30px;
    border-radius: 3px;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
`;
