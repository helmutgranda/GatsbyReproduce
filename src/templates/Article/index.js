/*
 * Package Import
 */
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

/*
 * Local Import
 */
import Layout from 'src/components/Layout';

/*
 * Template
 */
const ArticleTemplate = ({ data }) => {
  const { article, site } = data;
  const meta = site.siteMetadata;

  return (
    <Fragment>
      {/* SEO */}
      <Helmet>
        <title>{`${article.frontmatter.title} | ${meta.title}`}</title>
      </Helmet>

      <Layout>Article</Layout>
    </Fragment>
  );
};

/*
 * PropTypes
 */
ArticleTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

/*
 * GraphQL Query
 */
export const query = graphql`
  query Name($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    article: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        author
        category
      }
      fields {
        date(formatString: "DD MMM YYYY", locale: "fr")
        slug
      }
    }
    moreArticles: allMarkdownRemark(
      limit: 3
      filter: { fields: { slug: { ne: $slug } } }
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            author
          }
          fields {
            date(formatString: "DD MMM YYYY", locale: "fr")
            slug
          }
        }
      }
    }
  }
`;

/*
 * Export
 */
export default ArticleTemplate;
