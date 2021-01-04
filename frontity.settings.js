const settings = {
  name: "remarketingo",
  state: {
    frontity: {
      url: "https://www.borjagiron.com/",
      title: "Negocio Online - Consejos y Estrategias Marketing",
      description:
        "Hay que aprender como empezar un negocio online. El team Remarketingo te puede dar los mejores consejos y estrategias marketing.",
    },
  },
  packages: [
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
          url: "https://www.borjagiron.com/",
        },
      },
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
  ],
};

export default settings;
