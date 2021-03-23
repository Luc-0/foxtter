import { LOAD_USERS, SAVE_RECOMMENDED_USERS_ID } from './actionTypes';
import {
  loadUsers as firestoreLoadUsers,
  getRecommendedUsers,
} from '../../helpers/firestore';

const saveRecommendedUsersId = (recommmendedUsersId) => {
  return {
    type: SAVE_RECOMMENDED_USERS_ID,
    payload: {
      recommendedUsersId: recommmendedUsersId,
    },
  };
};

export function loadRecommendedUsers(currentUserId, followingIds, limit) {
  return (dispatch) => {
    getRecommendedUsers(currentUserId, followingIds, limit)
      .then((users) => {
        const recommendedUsersId = [...Object.keys(users)];

        dispatch(saveUsers(users));
        dispatch(saveRecommendedUsersId(recommendedUsersId));
      })
      .catch((error) => {
        console.log('get recommended users error', error);
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
