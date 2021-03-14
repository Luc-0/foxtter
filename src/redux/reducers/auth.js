import {
  LOGIN,
  LOGIN_FAIL,
  SIGNOUT,
  SIGNUP_FAIL,
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
    case SIGNOUT:
      return updateObject(state, {
        authenticated: false,
        user: {},
      });
  }

  return state;
};

export default auth;
