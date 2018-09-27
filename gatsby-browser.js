/*
 * Package Import
 */
import React from 'react';
import { hydrate } from 'emotion';
import { Provider } from 'react-redux';

/*
 * Local Import
 */
import store from 'src/store';

// Import global styles
import 'src/css/reset.css';
import 'src/css/fonts.css';

/**
 * Wrap the root Element •
 * @api : https://www.gatsbyjs.org/docs/browser-apis/#wrapRootElement
 */
export const wrapRootElement = ({ element }) => {
  const ConnectedRootElement = <Provider store={store}>{element}</Provider>;
  return ConnectedRootElement;
};

/**
 * On client entry • Called when the Gatsby browser runtime first starts.
 * @api : https://www.gatsbyjs.org/docs/browser-apis/#onClientEntry
 */
export const onClientEntry = () => {
  if (
    typeof window !== `undefined` &&
    typeof window.__EMOTION_CRITICAL_CSS_IDS__ !== `undefined`
  ) {
    hydrate(window.__EMOTION_CRITICAL_CSS_IDS__);
  }
};
