## Redux setup

### Thunks Middleware

This project has a redux setup that lets you manage async side effects on your actions in less lines of code. 

It can create and dispatch success and error actions for your side effects.
To make use of this functionality you need to create your async actions with the provided `createAsyncThunk` function from `@reduxjs/toolkit`.
This function receives the action name prefix as the first parameter, and a thunk that has side effects as the second.

Here is an example:
```js
// src/actions/userActions.js

export const getProfile = createAsyncThunk('user/profile', async (user) => {
  try {
    const { data: { data } } = await userService.getProfile({ user });
    return data;
  } catch ({ response: { data } }) {
    throw parseError(data);
  }
});
```

The you can dispatch this `getProfile` action, and the middleware will automatically dispatch `user/profile/pending`, `user/profile/fulfilled` or `user/profile/rejected` if the thunk is loading, or if it success or fails, respectively.

The returned object, (`getProfile` in the example above) has 3 properties you can use in order to handle the different dispatched actions in your reducer:
- pending
- fulfilled
- rejected

Following the previous example:

```js
// src/actions/userActions.js

export const { fulfilled: getProfileFulfilled } = getProfile;
```

```js
// src/reducers/userReducer.js

import { getProfileFulfilled } from 'src/actions/userActions';

const actionHandlers = {
  [getProfileFulfilled]: (state, { payload }) => {
    state.user = payload;
  },
};
```

### Status reducer

The base also includes a status reducer.
This tracks the status of each action you created with the `createAsyncThunk` utility.

To access this information on a component the `useStatus` hook is provided.

Here is a simple example:

```js
import { useStatus, useDispatch } from 'hooks';
import { getProfile } from 'src/actions/userActions';
import { PENDING, FULFILLED, REJECTED } from 'constants/actionStatusConstants';

const MyComponent = () => {
  const getProfileRequest = useDispatch(getProfile);
  const { status, error } = useStatus(getProfile);

  return <>
    <button onClick={getProfileRequest}>Show profile!</button>
    {(status === PENDING) && <Loading />}
    {(status === FULFILLED) && <ProfileComponent />}
    {(status === REJECTED) && <p>{error}<p/>}
  </>
}
```

To extract data from the Redux store, you can use `useSelector` hook from `react-redux`.
For example:

```js
import { useSelector, shallowEqual } from 'react-redux';

const useSession = () =>
  useSelector(
    ({ session: { authenticated, user } }) => ({ authenticated, user }),
    shallowEqual
  );
```

In the following example, we're importing `useSession` hook to access this information on a component:

```js
const ProfileComponent = () => {
  const { user } = useSession();

  return (
    <>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </>
  )
}
```
