import React from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { logout } from 'actions/sessionActions';

const LogoutButton = () => {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(logout())}>
      <FormattedMessage id="logout.button" />
    </button>
  );
};

export default LogoutButton;
