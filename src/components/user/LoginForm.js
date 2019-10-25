import React, { memo } from 'react';
import { func, string } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { useIntl, defineMessages, FormattedMessage } from 'react-intl';

import Loading from 'components/common/Loading';
import Input from 'components/common/Input';
import { validations, login } from 'utils/constraints';
import { LOADING } from 'constants/status';
import { useStatus } from 'hooks';
import { LOGIN } from 'actions/actionTypes';

const messages = defineMessages({
  email: { id: 'login.form.email' },
  password: { id: 'login.form.password' }
});

export const LoginForm = ({ handleSubmit, error }) => {
  const intl = useIntl();
  const { status } = useStatus(LOGIN);

  return (
    <form onSubmit={handleSubmit}>
      {error && <strong>{error}</strong>}
      <div>
        <Field
          name="email"
          label={intl.formatMessage(messages.email)}
          component={Input}
          type="email"
        />
      </div>
      <div>
        <Field
          name="password"
          label={intl.formatMessage(messages.password)}
          component={Input}
          type="password"
        />
      </div>
      <button type="submit">
        <FormattedMessage id="login.form.submit" />
      </button>
      {status === LOADING && <Loading />}
    </form>
  );
};

LoginForm.propTypes = {
  handleSubmit: func.isRequired,
  error: string
};

export default reduxForm({
  form: 'login',
  validate: validations(login, { fullMessages: false })
})(memo(LoginForm));
