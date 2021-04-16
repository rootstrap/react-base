import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { useSession } from 'hooks';
import RouteFromPath from 'components/routes/RouteFromPath';
import { bool, string } from 'prop-types';
import routes from '../routes';
import Header from './common/Header';

const App = ({ isSSR, title }) => {
  const { authenticated } = useSession();

  const RenderRoutes = ({ children }) => {
    return !isSSR ? <BrowserRouter>{children}</BrowserRouter> : <>{children}</>;
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header />
      <RenderRoutes>
        <Switch>
          {routes.map((route, index) => (
            <RouteFromPath key={`route${index}`} {...route} authenticated={authenticated} />
          ))}
        </Switch>
      </RenderRoutes>
    </>
  );
};

App.propTypes = {
  isSSR: bool,
  title: string
};

App.defaultProps = {
  isSSR: false,
  title: 'RS React Redux Base'
};

export default App;
