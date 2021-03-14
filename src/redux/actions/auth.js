import { SIGNUP_FAIL, LOGIN, SIGNOUT, LOGIN_FAIL } from './actionTypes';
import {
  signup as signupHelper,
  signIn,
  signOut as signOutHelper,
} from '../../helpers/auth';
import { createNewUserDoc, getUserById } from '../../helpers/firestore';

const signInUser = (userData) => {
  return {
    type: LOGIN,
    payload: {
      user: userData,
    },
  };
};

const signupFail = (error) => {
  return {
    type: SIGNUP_FAIL,
    payload: { error: error },
  };
};

export function signup(email, password, name) {
  return (dispatch) => {
    signupHelper(email, password)
      .then((user) => {
        createNewUserDoc(user.uid, name).then((newUserData) => {
          dispatch(signInUser(newUserData));
        });
      })
      .catch((error) => {
        const { code, message } = error;
        dispatch(signupFail({ code, message }));
      });
  };
}

const loginFail = (error) => {
  return {
    type: LOGIN_FAIL,
    payload: {
      error: error,
    },
  };
};

export function login(email, password) {
  return (dispatch) => {
    signIn(email, password)
      .then((user) => {
        getUserById(user.uid).then((userData) => {
          dispatch(signInUser(userData));
          console.log('signin');
        });
      })
      .catch((error) => {
        console.log('error', error);
        dispatch(loginFail(error));
      });
  };
}

export function loadUser(userId) {
  return (dispatch) => {
    getUserById(userId)
      .then((userData) => {
        dispatch(signInUser(userData));
      })
      .catch((error) => {});
  };
}

const signOutUser = () => {
  return {
    type: SIGNOUT,
  };
};

export function signOut() {
  return (dispatch) => {
    signOutHelper().then(() => {
      dispatch(signOutUser());
    });
  };
}
