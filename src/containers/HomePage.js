import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import LogoutButton from 'components/user/LogoutButton';

const HomePage = () => {
  const user = useSelector(state => state.session.user);

  return (
    <div>
      {user && user.email &&
        <p><FormattedMessage id="home.welcome" values={user} /></p>
      }
      <LogoutButton />
    </div>
  );
};

export default HomePage;
