import {
  LOAD_USERS,
  SAVE_RECOMMENDED_USERS_ID,
  UPDATE_USER_FWEETS,
  UPDATE_USER_FWEETS_SUCCESS,
  UPDATE_USER_FWEET,
  UPDATE_SEARCH_IDS,
} from './actionTypes';
import {
  loadUsers as firestoreLoadUsers,
  getRecommendedUsers,
  getUserFweets,
  searchUsers as firestoreSearchUsers,
} from '../../helpers/firestore';

const saveRecommendedUsersId = (recommmendedUsersId) => {
  return {
    type: SAVE_RECOMMENDED_USERS_ID,
    payload: {
      recommendedUsersId: recommmendedUsersId,
    },
  };
};

export function loadRecommendedUsers(currentUserId, followingIds) {
  return (dispatch) => {
    getRecommendedUsers(currentUserId, followingIds)
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

const saveUserFweets = (userId, userFweets) => {
  return {
    type: UPDATE_USER_FWEETS,
    payload: {
      id: userId,
      fweets: userFweets,
    },
  };
};

const updateUserFweetsSuccess = (userId) => {
  return {
    type: UPDATE_USER_FWEETS_SUCCESS,
    payload: {
      userId: userId,
    },
  };
};

export function updateUserFweets(userId) {
  return (dispatch) => {
    getUserFweets(userId)
      .then((userFweets) => {
        dispatch(saveUserFweets(userId, userFweets));
        dispatch(updateUserFweetsSuccess(userId));
      })
      .catch((error) => {
        console.log('update user fweets error', error);
      });
  };
}

export function updateFweet(userId, fweetId, fweetData) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_USER_FWEET,
      payload: {
        userId: userId,
        fweetId: fweetId,
        fweetData: fweetData,
      },
    });
  };
}

const updateSearchIds = (searchUsersId) => {
  return {
    type: UPDATE_SEARCH_IDS,
    payload: {
      searchUsersId: searchUsersId,
    },
  };
};

export function searchUsers(username, searchText) {
  return (dispatch) => {
    firestoreSearchUsers(username, searchText)
      .then((users) => {
        const ids = Object.keys(users);
        dispatch(saveUsers(users));
        dispatch(updateSearchIds(ids));
      })
      .catch((error) => {
        console.log('error search users action', error);
      });
  };
}
