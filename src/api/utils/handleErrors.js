import { sessionService } from 'redux-react-session';
import saveSessionHeaders from './saveSessionHeaders';

export default async (response) => {
  if (!response) {
    throw new Error({ message: 'No response returned from fetch' });
  }

  await saveSessionHeaders(response.headers);

  if (response.ok) {
    return response;
  }

  if (response.status === 401) {
    try {
      await sessionService.loadSession()
        .then(() => {
          sessionService.deleteSession();
          sessionService.deleteUser();
        });
    } catch (e) {
    }
  }

  throw await response.json()
    .then(json => json || new Error(response.statusText))
    .catch(() => new Error('Response not JSON'));
};
