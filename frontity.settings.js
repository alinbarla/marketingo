const sourceUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost/wordpress"
    : "https://wp.remarketingo.com/";

const settings = {
  name: "remarketingo",
  state: {
    frontity: {
      url: "https://wp.remarketingo.com/",
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
      name: "@frontity/google-analytics",
      state: {
        googleAnalytics: {
          trackingId: "UA-185292311-1",
        },
        analytics: {
          pageviews: true,
        },
      },
    },
  ],
};

export default settings;
