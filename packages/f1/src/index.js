import Theme from "./components";
import image from "@frontity/html2react/processors/image";
import iframe from "@frontity/html2react/processors/iframe";
import links from "./processor/links";

import ReactDOMServer from "react-dom/server";
import { ServerStyleSheets } from "@material-ui/core/styles";

import linkPaths from "./constants/links";

const allCategoriesHandler = {
  name: "allCategories",
  priority: 10,
  pattern: "all-categories",
  func: async ({ route, params, state, libraries }) => {
    const { api } = libraries.source;

    // 1. fetch the data you want from the endpoint page
    const response = await api.get({
      endpoint: "categories",
      params: {
        per_page: 100, // To make sure you get all of them
      },
    });

    // 2. get an array with each item in json format
    const unitems = await response.json();
    const items = unitems.map((item) => {
      const newItem = item;
      newItem.link = newItem.link.replace(state.source.url, "/");
      return newItem;
    });

    // 3. add data to source
    const currentPageData = state.source.data[route];

    Object.assign(currentPageData, {
      items,
    });
  },
};

const awsminF1 = {
  name: "@awsmin/f1",
  roots: {
    /**
     *  In Frontity, any package can add React components to the site.
     *  We use roots for that, scoped to the `theme` namespace.
     */
    theme: Theme,
  },
  state: {
    /**
     * State is where the packages store their default settings and other
     * relevant state. It is scoped to the `theme` namespace.
     */
    theme: {
      menu: [
        ["Home", "/"],
        ["Blog", linkPaths.blog],
        ["Sobre mi", linkPaths.sobreMi],
      ],
      isMobileMenuOpen: false,
      featured: {
        showOnList: false,
        showOnPost: false,
      },
    },
  },
  /**
   * Actions are functions that modify the state or deal with other parts of
   * Frontity like libraries.
   */
  actions: {
    theme: {
      beforeSSR:
        ({ actions, libraries }) =>
        async () => {
          await actions.source.fetch("all-categories");

          libraries.frontity.render = ({ App }) => {
            const sheets = new ServerStyleSheets();

            const html = ReactDOMServer.renderToString(sheets.collect(<App />));

            // Return the `html` and the `css` collected.
            return {
              html,
              css: sheets.toString(),
            };
          };

          const template = libraries.frontity.template;
          libraries.frontity.template = ({ head, result, ...rest }) => {
            const { html, css } = result;

            // Push the `css` in the head tags
            head.push(`<style id="jss-server-side">${css}</style>`);

            return template({
              ...rest,
              head,
              html,
            });
          };
        },
      beforeCSR: () => {
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
          jssStyles.parentElement.removeChild(jssStyles);
        }
      },
      toggleMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = !state.theme.isMobileMenuOpen;
      },
      closeMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = false;
      },
    },
  },
  libraries: {
    html2react: {
      /**
       * Add a processor to `html2react` so it processes the `<img>` tags
       * inside the content HTML. You can add your own processors too
       */
      processors: [image, iframe, links],
    },
    source: {
      handlers: [allCategoriesHandler],
    },
  },
};

export default awsminF1;
