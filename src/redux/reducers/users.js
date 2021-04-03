import {
  LOAD_USER,
  LOAD_USERS,
  SAVE_RECOMMENDED_USERS_ID,
  UPDATE_USER_FWEETS,
  UPDATE_USER_FWEETS_SUCCESS,
  UPDATE_USER_FWEET,
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
      let user = state.all[userId] ? state.all[userId] : {};

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
    case UPDATE_USER_FWEET: {
      const userId = action.payload.userId;
      const fweetId = action.payload.fweetId;
      const fweetData = action.payload.fweetData;

      const user = state.all[userId];
      if (!user) return state;

      const userFweets = user.fweets;
      if (!userFweets || !userFweets[fweetId]) return state;

      const newUser = {
        ...user,
        fweets: {
          ...userFweets,
          [fweetId]: {
            id: fweetId,
            ...fweetData,
          },
        },
      };

      return updateObject(state, {
        all: {
          ...state.all,
          [userId]: newUser,
        },
      });
    }
    default:
      return state;
  }
};

export default users;
