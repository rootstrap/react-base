import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { persistStore } from 'redux-persist';

import rootReducer from 'reducers';
import history from 'utils/history';

export default function configureStore(initialState) {
  const middlewares = [thunkMiddleware, routerMiddleware(history)];

  const store = createStore(
    rootReducer(history),
    initialState,
    compose(applyMiddleware(...middlewares))
  );

  const persistor = persistStore(store);

  return { store, persistor };
}
