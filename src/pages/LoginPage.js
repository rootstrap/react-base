import React, { memo } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useSession, useDispatch } from 'hooks';
import LoginForm from 'components/user/LoginForm';
import { login } from 'state/actions/userActions';
import routes from 'constants/routesPaths';

const LoginPage = () => {
  const { authenticated } = useSession();
  const loginRequest = useDispatch(login);

  if (authenticated) {
    return <Redirect to={routes.index} />;
  }

  return (
    <main>
      <p data-testid="login-test-id">
        <FormattedMessage id="login.title" />
      </p>
      <LoginForm onSubmit={loginRequest} />
      <Link to={routes.signUp}>
        <FormattedMessage id="login.signup" />
      </Link>
    </main>
  );
};

export default memo(LoginPage);
