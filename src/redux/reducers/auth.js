import {
  CLEAR_LOGIN_ERROR,
  LOGIN,
  LOGIN_FAIL,
  SIGNOUT,
  SIGNUP_FAIL,
  FOLLOW,
  UNFOLLOW,
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
    default:
      return state;
  }
};

export default auth;
