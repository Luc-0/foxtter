import { LOAD_ALL_USERS, LOAD_ALL_USERS_ERROR } from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  all: null,
  loadAllError: null,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_USERS:
      return updateObject(state, { all: action.payload.users });
    case LOAD_ALL_USERS_ERROR:
      return updateObject(state, { loadAllError: action.payload.error });
    default:
      return state;
  }
};

export default users;
