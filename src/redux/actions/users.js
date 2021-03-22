import {
  LOAD_ALL_USERS,
  LOAD_ALL_USERS_ERROR,
  LOAD_USERS,
} from './actionTypes';
import {
  getAllUsers,
  loadUsers as firestoreLoadUsers,
} from '../../helpers/firestore';

const loadAllUsersError = (error) => {
  return {
    type: LOAD_ALL_USERS_ERROR,
    payload: {
      error: error,
    },
  };
};

const loadAll = (users) => {
  return {
    type: LOAD_ALL_USERS,
    payload: {
      users: users,
    },
  };
};

export function loadAllUsers() {
  return (dispatch) => {
    getAllUsers()
      .then((users) => {
        dispatch(loadAll(users));
      })
      .catch((error) => {
        console.log('error all users');
        dispatch(loadAllUsersError(error));
      });
  };
}

const saveUsers = (users) => {
  return {
    type: LOAD_USERS,
    payload: {
      users: users,
    },
  };
};

export function loadUsers(userIds) {
  return (dispatch) => {
    console.log('load following users action creator');
    firestoreLoadUsers(userIds)
      .then((users) => {
        dispatch(saveUsers(users));
      })
      .catch((error) => {
        // TODO: Dispatch error
        console.log('error loading users', error.message);
      });
  };
}
