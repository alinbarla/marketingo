const sourceUrl = "https://wp.marketingo.it/";
// process.env.NODE_ENV === "development"
//   ? "http://localhost/wordpress"
//   : "https://wp.marketingo.it/";

const settings = {
  name: "marketingo",
  state: {
    frontity: {
      url: "https://wp.marketingo.it/",
      title: "Negocio Online - Consejos y Estrategias Marketing",
      description:
        "Hay que aprender como empezar un negocio online. El team Remarketingo te puede dar los mejores consejos y estrategias marketing.",
    },
  },
  packages: [
    "@frontity/wp-comments",
    {
      name: "@awsmin/f1",
      state: {
        theme: {
          menu: [],
          featured: {
            showOnList: false,
            showOnPost: false,
          },
        },
      },
    },
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          url: sourceUrl,
          params: {
            per_page: 5,
          },
        },
      },
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
    "@frontity/yoast",
    {
      name: "@frontity/google-tag-manager-analytics",
      state: {
        googleTagManagerAnalytics: {
          containerId: "GTM-P9BRLJ7",
        },
        analytics: {
          pageviews: {
            googleAnalytics: true,
          },
        },
      },
    },
  ],
};

export default settings;
