import React, { Fragment } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';

import history from 'utils/history';
import RouteFromPath from 'components/routes/RouteFromPath';
import routes from '../routes';
import theme from '../constants/theme';

const App = () => {
  const authenticated = useSelector(state => state.session.authenticated);
  const checked = useSelector(state => state.session.checked);

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Helmet>
          <title>RS React Redux Base</title>
        </Helmet>
        <ConnectedRouter history={history}>
          {checked &&
          <Switch>
            {routes.map((route, index) =>
              <RouteFromPath
                key={`route${index}`}
                {...route}
                authenticated={authenticated}
              />)
            }
          </Switch>
          }
        </ConnectedRouter>
      </Fragment>
    </ThemeProvider>
  );
};

export default App;
