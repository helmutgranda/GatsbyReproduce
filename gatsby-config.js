/**
 * Config Gatsby
 * @api Plugins : https://www.gatsbyjs.org/plugins/
 */
module.exports = {
  siteMetadata: {
    title: 'GatsbyReproduce',
    description: 'test', // @TODO
    author: "Alexandre Bourdeaud'hui",
    siteUrl: 'gatsbyjs.com',
  },
  plugins: [
    /*
     * Gatsby's data processing layer begins with “source” plugins.
     * You can source data nodes from anywhere but most sites,
     * will include data from the filesystem so we start here with
     * “gatsby-source-filesystem”.
     *
     * A site can have as many instances of gatsby-source-filesystem
     * as you need. Each plugin instance is configured with a root path
     * where it then recursively reads in files and adds them to the data tree.
     */
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/`,
      },
    },

    // Parse all Markdown files
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
            },
          },
          // Adds syntax highlighting to code blocks in markdown
          `gatsby-remark-prismjs`,
          // Copies local files linked to/from markdown to your public folder.
          `gatsby-remark-copy-linked-files`,
          // Replaces “dumb” punctuation marks with “smart” punctuation marks.
          `gatsby-remark-smartypants`,
        ],
      },
    },

    // A document head manager for React.
    'gatsby-plugin-react-helmet',

    // This plugin sets up Google Analytics for you.
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'YOUR_GOOGLE_ANALYTICS_TRACKING_ID',
      },
    },

    /*
     * Adds support for shipping a manifest.webmanifest with your site.
     * If you're using this plugin together with gatsby-plugin-offline, this
     * plugin should be listed before the offline plugin so that it can cache
     * the created manifest.webmanifest.
     */
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'GatsbyReproduce',
        short_name: 'GatsbyReproduce',
        start_url: '/',
        description: 'test', // @TODO
        background_color: '#0ac3a7',
        theme_color: '#fffdd8',
        display: 'minimal-ui',
        // @TODO : Choose between `automatic`, `hybride` or `manual` mode
        // icons: [
        //   {
        //     src: '/favicons/logo-192.png',
        //     sizes: '192x192',
        //     type: 'image/png',
        //   },
        //   {
        //     src: '/favicons/logo-512.png',
        //     sizes: '512x512',
        //     type: 'image/png',
        //   },
        // ],
      },
    },

    /*
     * This plugin generates a service worker and AppShell html file, so the
     * site works offline and is otherwise resistant to bad networks.
     * Works with almost any site!
     */
    'gatsby-plugin-offline',
  ],
};
