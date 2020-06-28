module.exports = {
  siteMetadata: {
    title: `Safe Lanes Toronto`,
    description: `A tool for cyclists to snitch on motorists to each other`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@components': `${__dirname}/src/components`,
          '@services': `${__dirname}/src/services`,
          '@styles': `${__dirname}/src/styles`,
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: "safelanesto.ca",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Safe Lanes TO",
        short_name: "SafelanesTO",
        start_url: "/",
        background_color: "#6b37bf",
        theme_color: "#6b37bf",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "src/images/icon.png", // This path is relative to the root of the site.
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        crossOrigin: `use-credentials`,
        icon: `src/images/icon.png`,
        "permissions": [
          "geolocation",
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
