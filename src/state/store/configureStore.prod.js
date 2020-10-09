import { persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';

import reducer from 'state/reducers';

export default (isServerSide = false) => {
  const store = configureStore({ reducer });

  if (isServerSide) {
    return { store };
  }

  const persistor = persistStore(store);

  return { store, persistor };
};
