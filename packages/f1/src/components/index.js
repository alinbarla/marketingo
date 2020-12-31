import React from "react";
import { Global, Head, connect, css, styled } from "frontity";
import Switch from "@frontity/components/switch";

import Header from "./header/header";
import Footer from "./Layout/Footer";
import Post from "./post";
import Blog from "./pages/blog";
import Home from "./pages/index";
import Title from "./title";
import About from "./pages/about";
import PageError from "./page-error";
import BootstrapCss from "./styles/bootstrap.css";
import gutenbergStyle from "./styles/gutenberg/style.css";
import gutenbergTheme from "./styles/gutenberg/theme.css";
import breakpoints from "../constants/breakpoints";
import favicon from "./images/favicon.png";

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 */
const Theme = ({ state }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);

  return (
    <>
      {/* Add some metatags to the <head> of the HTML. */}
      <Title />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="es" />
        <link rel="icon" href={favicon} type="image/png" />
      </Head>

      {/* Add some global styles for the whole site, like body or a's.
      Not classes here because we use CSS-in-JS. Only global HTML tags. */}
      <Global styles={css(BootstrapCss)} />
      <Global styles={css(gutenbergStyle)} />
      <Global styles={css(gutenbergTheme)} />
      <Global styles={globalStyles} />

      {/* Add the header of the site. */}
      <HeadContainer>
        <Header />
      </HeadContainer>

      {/* Add the main section. It renders a different component depending
      on the type of URL we are in. */}
      <div>
        <Switch>
          <Home when={data.isHome} />
          <About when={state.router.link === "/about/"} />
          <Blog when={state.router.link === "/blog/"} />
          <Post when={data.isPostType} />
          <PageError when={data.isError} />
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default connect(Theme);

const globalStyles = css`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap");

  :root {
    --brand: #00d07e;
    --black: #000000;
    --white: #ffffff;
    --bodycolor: #343434;
  }
  body {
    margin: 0;
    color: var(--bodycolor);
    font-family: "Inter", -apple-system, system-ui, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Droid Sans", "Helvetica Neue", Helvetica, Arial,
      sans-serif;
    font-feature-settings: "kern";
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: #3ae282;
    font-weight: 700;
  }

  a,
  a:visited {
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--black);
  }

  h2 {
    font-size: 2rem;
    font-weight: 900;
    letter-spacing: -0.04rem;
    line-height: 2.2rem;

    @media (min-width: ${breakpoints.md}) {
      font-size: 2.5rem;
    }
  }

  h3 {
    font-size: 1.75rem;
    font-weight: 700;
  }

  p,
  a {
    font-size: 1.3rem;
    line-height: 2.25rem;
  }

  button {
    box-shadow: none;
    border: none;
  }

  img,
  video {
    max-width: 100%;
  }

  #root {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .container {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    padding-right: 15px;
    padding-left: 15px;
  }
  .section {
    padding: 34px 0;
    @media (min-width: 992px) {
      padding: 50px 0;
    }
  }
`;

const HeadContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  justify-content: space-between;
  margin: 0 auto;
  padding: 1.25rem 0.9375rem;
  background-color: white;
  z-index: 1000;
`;
