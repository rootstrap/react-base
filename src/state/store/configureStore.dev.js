import { createLogger } from 'redux-logger';
import { persistStore } from 'redux-persist';
import _ from 'lodash';
import { configureStore } from '@reduxjs/toolkit';

import reducer from 'state/reducers';

export default () => {
  const logger = createLogger({
    collapsed: true,
    predicate: (getState, { type }) => !_.startsWith(type, '@@router')
  });

  const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
    enhancers: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  });

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  const persistor = persistStore(store);

  return { store, persistor };
};
