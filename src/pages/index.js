/*
 * Package Import
 */
import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

/*
 * Local Import
 */
import Layout from 'src/components/Layout';
import { getContributor } from 'src/utils';

/*
 * Component
 */
export default class IndexPage extends React.Component {
  state = {};

  componentDidMount() {
    this.getData('alexandrebourdeaudhui');
  }

  getData = author => getContributor(author);

  render() {
    return <Layout>Home</Layout>;
  }
}

/*
 * PropTypes
 */
IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
};

/*
 * GraphQL Query
 */
export const query = graphql`
  query HomeQuery {
    allMarkdownRemark(
      limit: 7
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
