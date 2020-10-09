import imm from 'immer';
import { NOT_STARTED, FULFILLED, REJECTED, PENDING } from 'constants/actionStatusConstants';

const handleAction = (state, action) => {
  const { type, error } = action;

  const matchesStart = /(.*)\/pending/.exec(type);
  const matchesError = /(.*)\/rejected/.exec(type);
  const matchesSuccess = /(.*)\/fulfilled/.exec(type);
  const matchesReset = /(.*)\/reset/.exec(type);

  let status = NOT_STARTED;
  let key = null;

  if (matchesStart) {
    const [, requestName] = matchesStart;
    key = requestName;
    status = PENDING;
  } else if (matchesReset) {
    const [, requestName] = matchesReset;
    key = requestName;
    status = NOT_STARTED;
  } else if (matchesError) {
    const [, requestName] = matchesError;
    key = requestName;
    status = REJECTED;
  } else if (matchesSuccess) {
    const [, requestName] = matchesSuccess;
    key = requestName;
    status = FULFILLED;
  }

  if (key) state[key] = { status, error: matchesError ? error?.message : undefined };

  return state;
};

export default (state = {}, action) => imm(state, draft => handleAction(draft, action));
