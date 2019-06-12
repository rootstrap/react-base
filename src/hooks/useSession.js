import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const selectSession = createSelector(
  state => state.session,
  session => ({
    authenticated: session.authenticated,
    checked: session.checked,
    user: session.user,
  })
);

const useSession = () => useSelector(selectSession);

export default useSession;
