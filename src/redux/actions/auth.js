import {
  SIGNUP_FAIL,
  LOGIN,
  SIGNOUT,
  LOGIN_FAIL,
  CLEAR_LOGIN_ERROR,
  FOLLOW,
  UNFOLLOW,
  ADD_FWEET,
  LIKE,
  UNLIKE,
  REPLY_ERROR,
  UPDATE_USER,
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
  createRefweet,
  reply as firestoreReply,
  updateUser as firestoreUpdateUser,
} from '../../helpers/firestore';
import fweet from '../../helpers/fweet';

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
    const dateCreated = firestore.Timestamp.now().toDate();
    const firestoreFweet = {
      ...fweetContent,
      likes: 0,
      refweets: [],
      replies: [],
      dateCreated: dateCreated,
    };

    createFweet(currentUser.id, firestoreFweet)
      .then((doc) => {
        const fweetId = doc.id;
        const newFweet = fweet(
          currentUser.id,
          currentUser.name,
          currentUser.username,
          currentUser.pictureUrl,
          fweetId,
          firestoreFweet.text,
          firestoreFweet.dateCreated,
          firestoreFweet.refweets,
          firestoreFweet.replies
        );

        dispatch(saveFweet(newFweet));
      })
      .catch((error) => {
        console.log('create fweet error', error.message);
      });
  };
}

export function refweet(currentUser, fweetContent, target) {
  //
  return (dispatch) => {
    createRefweet(currentUser.id, fweetContent, target).then((createdFweet) => {
      const newFweet = fweet(
        currentUser.id,
        currentUser.name,
        currentUser.username,
        currentUser.pictureUrl,
        createdFweet.id,
        createdFweet.text,
        createdFweet.dateCreated,
        createdFweet.refweets,
        createdFweet.replies,
        createdFweet.refweet
      );
      dispatch(saveFweet(newFweet));
    });
  };
}

export function like(likeId) {
  return {
    type: LIKE,
    payload: {
      likeId: likeId,
    },
  };
}

export function unlike(likeId) {
  return {
    type: UNLIKE,
    payload: {
      likeId,
    },
  };
}

const replyError = (error) => {
  return {
    type: REPLY_ERROR,
    payload: {
      error,
    },
  };
};

export function reply(currUserId, targetId, fweetId, reply, replyTo = null) {
  return (dispatch) => {
    firestoreReply(
      currUserId,
      targetId,
      fweetId,
      reply,
      replyTo ? replyTo : ''
    ).catch((error) => {
      dispatch(replyError(error));
    });
  };
}

const saveUserUpdate = (userId, userUpdate) => {
  return {
    type: UPDATE_USER,
    payload: {
      userId: userId,
      userUpdate: userUpdate,
    },
  };
};

export function updateUser(userId, userUpdate) {
  return (dispatch) => {
    firestoreUpdateUser(userId, userUpdate)
      .then(() => {
        dispatch(saveUserUpdate(userId, userUpdate));
      })
      .catch((error) => {
        console.log('error updateing user', error);
      });
  };
}
