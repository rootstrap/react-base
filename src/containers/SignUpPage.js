import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { signUp } from 'actions/userActions';
import SignUpForm from 'components/user/SignUpForm';
import routes from 'constants/routesPaths';

const SignUpPage = () => {
  const authenticated = useSelector(state => state.session.authenticated);
  const dispatch = useDispatch();

  if (authenticated) {
    return <Redirect to={routes.index} />;
  }

  return (
    <div>
      <p><FormattedMessage id="signup.title" /></p>
      <SignUpForm onSubmit={user => dispatch(signUp(user))} />
      <Link to={routes.login}>
        <FormattedMessage id="signup.signin" />
      </Link>
    </div>
  );
};

export default memo(SignUpPage);
