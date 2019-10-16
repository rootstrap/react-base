import { saveSession, logout } from 'actions/userActions';

const ACCESS_TOKEN = 'access-token';

const UNAUTHORIZED = 401;

const defaultRequestInterceptors = store => [
  async request => {
    try {
      const { token } = store.getState().session;
      if (token) {
        request.headers = {
          ...request.headers,
          [ACCESS_TOKEN]: token
        };
      }
    } catch (error) {
      console.log('Failed to load session headers', error); // eslint-disable-line
    }
    return request;
  }
];

const defaultResponseInterceptors = store => [
  async response => {
    if (response.ok) {
      const { headers } = response;
      const token = headers.get(ACCESS_TOKEN);
      if (token) {
        store.dispatch(saveSession({ token }));
      }
    }
    if (response.status === UNAUTHORIZED) {
      store.dispatch(logout());
    }
    return response;
  }
];

export default (store, apiService) => {
  defaultRequestInterceptors(store).forEach(interceptor =>
    apiService.requestInterceptors.use(interceptor)
  );

  defaultResponseInterceptors(store).forEach(interceptor =>
    apiService.responseInterceptors.use(interceptor)
  );
};
