import { createReducer } from '@reduxjs/toolkit';
import { login, signUp, logout, updateSession } from 'state/actions/userActions';

const initialState = {
  authenticated: false,
  user: null,
  info: {}
};

const actionHandlers = {
  [login.fulfilled]: (state, { payload }) => {
    state.user = payload;
  },
  [signUp.fulfilled]: (state, { payload }) => {
    state.user = payload;
  },
  [updateSession]: (state, { payload }) => {
    state.info = payload;
    state.authenticated = true;
  },
  [logout.fulfilled]: () => initialState
};

export default createReducer(initialState, actionHandlers);
