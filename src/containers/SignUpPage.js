import React, { memo } from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { signUp } from 'actions/userActions';
import SignUpForm from 'components/user/SignUpForm';
import routes from 'constants/routesPaths';

const SignUpPage = ({ signUp, authenticated }) => {
  if (authenticated) {
    return <Redirect to={routes.index} />;
  }

  return (
    <div>
      <p><FormattedMessage id="signup.title" /></p>
      <SignUpForm onSubmit={signUp} />
      <Link to={routes.login}>
        <FormattedMessage id="signup.signin" />
      </Link>
    </div>
  );
};

SignUpPage.propTypes = {
  signUp: func.isRequired,
  authenticated: bool.isRequired
};

const mapState = state => ({
  authenticated: state.getIn(['session', 'authenticated'])
});

const mapDispatch = dispatch => ({
  signUp: user => dispatch(signUp(user.toJS()))
});

export default connect(mapState, mapDispatch)(memo(SignUpPage));
