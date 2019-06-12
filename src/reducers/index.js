import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { sessionReducer as session } from 'redux-react-session';
import { connectRouter } from 'connected-react-router'

// import router from './routerReducer';

const rootReducer = history => combineReducers({
  form,
  session,
  router: connectRouter(history),
});

export default rootReducer;
