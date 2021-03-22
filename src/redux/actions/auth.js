import {
  SIGNUP_FAIL,
  LOGIN,
  SIGNOUT,
  LOGIN_FAIL,
  CLEAR_LOGIN_ERROR,
  FOLLOW,
  UNFOLLOW,
  ADD_FWEET,
} from './actionTypes';
import {
  signup as signupHelper,
  signIn,
  signOut as signOutHelper,
} from '../../helpers/auth';
import {
  createNewUserDoc,
  getUserById,
  createFweet,
} from '../../helpers/firestore';
import { firestore } from '../../services/firebase';

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

export function clearLoginError() {
  return {
    type: CLEAR_LOGIN_ERROR,
  };
}

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

export function follow(userId) {
  return {
    type: FOLLOW,
    payload: {
      userId: userId,
    },
  };
}

export function unfollow(userId) {
  return {
    type: UNFOLLOW,
    payload: {
      userId: userId,
    },
  };
}

const saveFweet = (fweet) => {
  return {
    type: ADD_FWEET,
    payload: {
      fweet: fweet,
    },
  };
};

export function addFweet(currentUser, fweetContent) {
  return (dispatch) => {
    const timestamp = firestore.FieldValue.serverTimestamp();
    const newFweet = {
      ...fweetContent,
      likes: 0,
      refweets: [],
      replies: [],
      timestamp: timestamp,
    };

    createFweet(currentUser.id, newFweet)
      .then((doc) => {
        const fweetId = doc.id;
        newFweet.user = {
          id: currentUser.id,
          name: currentUser.name,
          username: currentUser.username,
          profilePicture: currentUser.profilePicture,
        };
        newFweet.id = fweetId;

        dispatch(saveFweet(newFweet));
      })
      .catch((error) => {
        console.log('create fweet error', error.message);
      });
  };
}
