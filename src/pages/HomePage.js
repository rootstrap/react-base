import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSession } from 'hooks';

import LogoutButton from 'components/user/LogoutButton';

const HomePage = () => {
  const { user } = useSession();

  return (
    <main>
      {user && user.email && (
        <p aria-label="greeting">
          <FormattedMessage id="home.welcome" values={user} />
        </p>
      )}
      <LogoutButton />
    </main>
  );
};

export default HomePage;
