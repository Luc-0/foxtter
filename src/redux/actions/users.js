import { LOAD_ALL_USERS, LOAD_ALL_USERS_ERROR } from './actionTypes';
import { getAllUsers } from '../../helpers/firestore';

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
