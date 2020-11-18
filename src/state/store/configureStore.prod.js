import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { thunkMiddleware } from '@rootstrap/redux-tools';

import rootReducer from 'state/reducers';

export default function configureStore(initialState) {
  const middlewares = [thunkMiddleware];

  const store = createStore(rootReducer(), initialState, compose(applyMiddleware(...middlewares)));

  const persistor = persistStore(store);

  return { store, persistor };
}
