import { LOAD_USERS, SAVE_RECOMMENDED_USERS_ID } from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  all: {},
  recommendedUsersId: [],
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USERS:
      return updateObject(state, {
        all: { ...state.all, ...action.payload.users },
      });
    case SAVE_RECOMMENDED_USERS_ID:
      return updateObject(state, {
        recommendedUsersId: [
          ...action.payload.recommendedUsersId,
          ...state.recommendedUsersId,
        ],
      });
    default:
      return state;
  }
};

export default users;
