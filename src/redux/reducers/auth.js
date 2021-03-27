import {
  CLEAR_LOGIN_ERROR,
  LOGIN,
  LOGIN_FAIL,
  SIGNOUT,
  SIGNUP_FAIL,
  FOLLOW,
  UNFOLLOW,
  ADD_FWEET,
  LIKE,
  UNLIKE,
} from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  authenticated: false,
  user: {},
  signupError: null,
  loginError: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_FAIL:
      return updateObject(state, { signupError: action.payload.error });
    case LOGIN:
      return updateObject(state, {
        authenticated: true,
        user: action.payload.user,
      });
    case LOGIN_FAIL:
      return updateObject(state, { loginError: action.payload.error });
    case CLEAR_LOGIN_ERROR:
      return updateObject(state, { loginError: null });
    case SIGNOUT:
      return updateObject(state, {
        authenticated: false,
        user: {},
      });
    case FOLLOW:
      return updateObject(state, {
        user: {
          ...state.user,
          following: [...state.user.following, action.payload.userId],
        },
      });
    case UNFOLLOW:
      return updateObject(state, {
        user: {
          ...state.user,
          following: state.user.following.filter(
            (currId) => currId !== action.payload.userId
          ),
        },
      });
    case ADD_FWEET:
      return updateObject(state, {
        user: {
          ...state.user,
          fweets: [...state.user.fweets, action.payload.fweet],
        },
      });
    case LIKE: {
      const likeId = action.payload.likeId;

      if (state.user.likes.includes(likeId)) {
        return state;
      }

      return updateObject(state, {
        user: {
          ...state.user,
          likes: [...state.user.likes, likeId],
        },
      });
    }
    case UNLIKE: {
      const likeId = action.payload.likeId;

      const newLikes = state.user.likes.filter((id) => id !== likeId);

      return updateObject(state, {
        user: {
          ...state.user,
          likes: newLikes,
        },
      });
    }
    default:
      return state;
  }
};

export default auth;
