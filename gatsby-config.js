module.exports = {
  siteMetadata: {
    title: `WebriQ Site Preview`,
    description: `Template used for previewing contents of site in Gatsby development mode.`,
    author: `@webriq`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: process.env.SANITY_PROJECT_ID || `uakgwcar`,
        dataset: process.env.SANITY_DATASET || `production`,

        // a token with read permissions is required
        // if you have a private dataset
        token: process.env.SANITY_TOKEN,

        watchMode: process.env.SANITY_WATCH_MODE || true,
        overlayDrafts: process.env.SANITY_OVERLAY_DRAFTS || true,

        // If the Sanity GraphQL API was deployed using `--tag <name>`,
        // use `graphqlTag` to specify the tag name. Defaults to `default`.
        graphqlTag: process.env.SANITY_GRAPHQL_TAG || "default",
      },
    },
  ],
}
