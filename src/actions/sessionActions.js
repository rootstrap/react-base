import * as types from './actionTypes';
import sessionApi from 'api/sessionApi';
import * as session from 'services/sessionService';
import { SubmissionError } from 'redux-form';

export const loginSuccess = () => {
  return { type: types.LOGIN_SUCCESS };
};

export const logoutSuccess = () => {
  return { type: types.LOGOUT_SUCCESS };
};

export const login = (user) => {
  return (dispatch) => {
    return sessionApi.login({ user }).then(response => {
      session.saveUser(response.data);
      dispatch(loginSuccess());
    }).catch(err => {
      throw new SubmissionError({
        _error: err.errors[0]
      });
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    return sessionApi.logout().then(() => {
      session.deleteSession();
      session.deleteUser();
      dispatch(logoutSuccess());
    }).catch(err => {
      throw (err);
    });
  };
};
