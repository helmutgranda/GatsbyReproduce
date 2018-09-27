/*
 * Package Import
 */
import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

/*
 * Local Import
 */

/*
 * Component
 */
const SEO = ({ title, description, image }) => (
  <Helmet
    title={title}
    meta={[
      // General tags
      { name: 'description', content: description },
      { name: 'image', content: 'image' },

      // OpenGraph tags
      { property: 'og:type', content: 'article' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },

      // Twitter Card tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ]}
  />
);

/*
 * PropTypes
 */
SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

/*
 * Export
 */
export default SEO;
