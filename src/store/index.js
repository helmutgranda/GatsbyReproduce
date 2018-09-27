/*
 * Package Import
 */
import { compose, createStore } from 'redux';

/*
 * Local Import
 */
import reducer from './reducer';

/*
 * Redux DevTools Extension
 */
let devTools = [];

if (process.env.NODE_ENV !== 'production') {
  if (typeof window !== 'undefined' && window.devToolsExtension) {
    devTools = [window.devToolsExtension()];
  }
}

/*
 * Middlewares
 */
const middlewaresCompose = compose(...devTools);

// Store
const store = createStore(reducer, middlewaresCompose);

/*
 * Export
 */
export default store;
