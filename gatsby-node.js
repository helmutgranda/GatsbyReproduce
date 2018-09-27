/*
 * Package Import
 */
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

/*
 * Local Import
 */

/*
 * Code
 */

// Parse date information out of blog post filename.
const POST_FILENAME_REGEX = /([0-9]+)-([0-9]+)-([0-9]+)_(.+)\/([a-z]+)\.md$/;

/**
 * Create a Webpack config.
 * @api : https://www.gatsbyjs.org/docs/node-apis/#onCreateWebpackConfig
 */
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src'),
      },
    },
  });
};

/**
 * Create Babel config
 * @api : https://www.gatsbyjs.org/docs/node-apis/#onCreateBabelConfig
 */
exports.onCreateBabelConfig = ({ actions }, pluginOptions) => {
  actions.setBabelPlugin({
    name: `babel-plugin-emotion`,
    options: {
      sourceMap: process.env.NODE_ENV !== `production`,
      ...(pluginOptions || {}),
    },
  });
};

/**
 * On create Node
 * @api : https://www.gatsbyjs.org/docs/node-apis/#onCreateNode
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  if (node.internal.type === `MarkdownRemark`) {
    let slug = createFilePath({ node, getNode });
    const { relativePath } = getNode(node.parent);

    if (relativePath.includes('blog')) {
      const match = POST_FILENAME_REGEX.exec(relativePath);

      // Get data that we need
      const year = match[1];
      const month = match[2];
      const day = match[3];
      const filename = match[4];

      // New format slug
      slug = `/blog/${filename}`;

      const date = new Date(year, month - 1, day);

      // Blog posts are sorted by date and display the date in their header.
      actions.createNodeField({
        node,
        name: 'date',
        value: date.toJSON(),
      });
    }

    // Used to generate `slug` to view this content.
    actions.createNodeField({ name: `slug`, node, value: slug });

    // Used to generate a GitHub edit link.
    actions.createNodeField({ name: 'path', node, value: relativePath });
  }
};

/**
 * Create Pages
 * This is called after the Gatsby bootstrap is finished, so you have access
 * to any information necessary to programatically create pages.
 *
 * @api : https://www.gatsbyjs.org/docs/node-apis/#createPages
 */
exports.createPages = ({ actions, graphql }) =>
  new Promise((resolve, reject) => {
    // Templates
    const Article = path.resolve('./src/templates/Article/index.js');

    // Query for all Markdowns
    resolve(
      graphql(`
        {
          allMarkdownRemark(sort: { fields: [fields___date], order: DESC }) {
            edges {
              node {
                frontmatter {
                  title
                }
                fields {
                  slug
                }
              }
            }
          }
        }
      `).then(result => {
        // If we have errors
        if (result.errors) {
          reject(result.errors);
        }

        // Create Blog posts Pages
        result.data.allMarkdownRemark.edges.forEach(edge => {
          actions.createPage({
            path: edge.node.fields.slug,
            component: Article,
            context: {
              // Add optional context data.
              // Data can be used as arguments to the page GraphQL query.
              slug: edge.node.fields.slug,
            },
          });
        });
      }),
    );
  });
