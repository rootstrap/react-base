import { useSelector, shallowEqual } from 'react-redux';

const useSession = () =>
  useSelector(
    ({ session }) => ({
      authenticated: session.authenticated,
      user: session.user
    }),
    shallowEqual
  );

export default useSession;
