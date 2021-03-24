import {
  LOAD_USER,
  LOAD_USERS,
  SAVE_RECOMMENDED_USERS_ID,
  UPDATE_USER_FWEETS,
  UPDATE_USER_FWEETS_SUCCESS,
} from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  all: {},
  recommendedUsersId: [],
  updateFweetsSuccess: null,
  updateFweetsError: null,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      const newAll = { ...state.all };
      const user = action.payload.user;
      newAll[user.id] = user;
      return updateObject(state, { all: newAll });
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
    case UPDATE_USER_FWEETS: {
      const userId = action.payload.id;
      const fweets = action.payload.fweets;
      const user = state.all[userId];

      if (!user) {
        return state;
      }

      const newAll = { ...state.all };
      newAll[userId] = {
        ...user,
        fweets: fweets,
      };

      return updateObject(state, {
        all: newAll,
      });
    }
    case UPDATE_USER_FWEETS_SUCCESS:
      return updateObject(state, {
        ...state,
        updateFweetsSuccess: { userId: action.payload.userId },
      });
    default:
      return state;
  }
};

export default users;
