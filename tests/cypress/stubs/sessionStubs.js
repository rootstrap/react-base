import {
  POST,
  DELETE,
  SUCCESS_CODE,
  UNAUTHORIZED_CODE,
  UNPROCESSABLE_ENTITY_CODE
} from 'cypress/support/constants';
import userBuilder from 'fixtures/userFactory';

// STUBS

export const loginStub = customUser => ({
  name: 'loginStub',
  method: POST,
  url: '/users/sign_in',
  cases: {
    success: {
      status: SUCCESS_CODE,
      response: { user: customUser != null ? customUser : userBuilder() }
    },
    fail: {
      status: UNAUTHORIZED_CODE,
      response: { error: 'Invalid login credentials. Please try again.' },
      withHeaders: false
    }
  }
});

export const signUpStub = customUser => ({
  name: 'signUpStub',
  method: POST,
  url: '/users',
  cases: {
    success: {
      status: SUCCESS_CODE,
      response: { user: customUser != null ? customUser : userBuilder({ complete: false }) }
    },
    fail: {
      status: UNPROCESSABLE_ENTITY_CODE,
      response: { error: 'Email has already been taken' },
      withHeaders: false
    }
  }
});

export const logoutStub = () => ({
  name: 'logoutStub',
  method: DELETE,
  url: '/users/sign_out',
  cases: {
    success: {
      status: SUCCESS_CODE,
      response: { status: 'ok' },
      withHeaders: false
    }
  }
});
