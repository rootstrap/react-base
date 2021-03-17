import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { render as rtlRender } from '@testing-library/react';
import locales from 'locales';
import httpClient from 'httpClient';
import applyDefaultInterceptors from 'httpClient/applyDefaultInterceptors';

import { DEFAULT_LANGUAGE } from 'constants/constants';
import configureStore from 'state/store/configureStore.prod';

const getDefaultStore = initialState => {
  const { store } = configureStore(initialState, true);
  return store;
};

export default (
  ui,
  {
    locale = DEFAULT_LANGUAGE,
    initialState,
    store = getDefaultStore(initialState),
    ...options
  } = {}
) => {
  const Wrapper = ({ children }) => {
    applyDefaultInterceptors(store, httpClient);

    return (
      <IntlProvider locale={locale} messages={locales[locale]}>
        <Provider store={store}>{children}</Provider>
      </IntlProvider>
    );
  };

  return rtlRender(ui, { wrapper: Wrapper, ...options });
};
