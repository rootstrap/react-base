import { sessionService } from 'redux-react-session';
import saveSessionHeaders from './saveSessionHeaders';

export default response =>
  new Promise((resolve, reject) => {
    if (!response) {
      reject(new Error({ message: 'No response returned from fetch' }));
      return;
    }

    saveSessionHeaders(response.headers);

    if (response.ok) {
      resolve(response);
      return;
    }

    if (response.status === 401) {
      sessionService.loadSession()
        .then(() => {
          sessionService.deleteSession();
          sessionService.deleteUser();
        })
        .catch(() => {});
    }

    response.json()
      .then((json) => {
        const error = json || { message: response.statusText };
        reject(error);
      })
      .catch(() => reject(new Error({ message: 'Response not JSON' })));
  });
