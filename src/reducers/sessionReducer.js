import * as types from 'actions/actionTypes';
import createReducer from './createReducer';

const initialState = {
  token: undefined,
  authenticated: false,
  user: null
};

const actionHandlers = {
  [types.SAVE_SESSION]: (state, { token }) => {
    state.token = token;
    state.authenticated = true;
  },

  [types.SAVE_USER]: (state, { user }) => {
    state.user = user;
  },

  [types.REMOVE_DATA]: () => initialState
};

export default createReducer(initialState, actionHandlers);
