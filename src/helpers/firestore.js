import { firestore } from '../services/firebase';

export async function createFweet(userId, fweet) {
  const userFweetsRef = firestore()
    .collection('users')
    .doc(userId)
    .collection('fweets');

  return userFweetsRef.add(fweet);
}

export async function createRefweet(userId, fweetContent, target) {
  try {
    const dateCreated = firestore.Timestamp.now().toDate();
    const newFweet = {
      ...fweetContent,
      likes: 0,
      refweets: [],
      replies: [],
      dateCreated: dateCreated,
    };

    const createdFweetRes = await createFweet(userId, newFweet);

    const createdFweetId = createdFweetRes.id;
    const targetFweetRef = firestore()
      .collection('users')
      .doc(target.userId)
      .collection('fweets')
      .doc(target.fweetId);
    const updateTargetFweetRes = await targetFweetRef.set(
      {
        refweets: firestore.FieldValue.arrayUnion(userId + createdFweetId),
      },
      { merge: true }
    );

    return Promise.all([createdFweetRes, updateTargetFweetRes]).then(() => {
      return { ...newFweet, id: createdFweetId };
    });
  } catch (error) {
    console.log('error refweeting: ', error.message);
  }
}

export async function createNewUserDoc(uid, name) {
  const username = await createValidUsername(name);

  const newUser = {
    id: uid,
    name: name,
    username: username,
    fweets: [],
    likes: [],
    following: [],
    followers: [],
    pictureUrl: '',
    backgroundUrl: '',
    description: '',
  };

  await firestore().collection('users').doc(uid).set(newUser);

  return newUser;
}

async function getAllUsernames() {
  const usernames = [];

  const usersDoc = await firestore().collection('users').get();
  usersDoc.forEach((doc) => {
    const data = doc.data();

    if (!data) {
      return;
    }

    const username = data.username;
    if (username) {
      usernames.push(username);
    }
  });

  return usernames;
}

async function createValidUsername(name) {
  const usernames = await getAllUsernames();
  let randomNumber = Math.floor(Math.random() * 10000);
  const removedSpaceName = name.replace(' ', '');
  const newName =
    removedSpaceName.length > 10
      ? removedSpaceName.split('').slice(0, 10).join('')
      : removedSpaceName;

  let username = newName + randomNumber;

  if (!usernames.includes(username)) {
    return username;
  } else {
    while (usernames.includes(username)) {
      randomNumber = Math.floor(Math.random() * 10);
      username += randomNumber;
    }

    return username;
  }
}

export async function updateUser(userId, userData) {
  try {
    const userRef = firestore().collection('users').doc(userId);

    return userRef.set(
      {
        ...userData,
      },
      {
        merge: true,
      }
    );
  } catch (error) {
    console.log('error updating user', error);
  }
}

export async function getUserById(id) {
  try {
    const userDoc = await firestore().collection('users').doc(id).get();

    if (userDoc.exists) {
      return userDoc.data();
    }

    return Promise.reject('user does not exist.');
  } catch (error) {
    console.log(error.code);
  }
}

export async function getRecommendedUsers(currentUserId, followingIds) {
  if (!Array.isArray(followingIds)) {
    throw TypeError('Not an array');
  }

  try {
    const minLimit = 30;
    const limit = followingIds.length + minLimit;
    const recommendedUsersRef = firestore().collection('users').limit(limit);

    const users = {};
    const res = await recommendedUsersRef.get();

    if (res.empty) {
      return users;
    }

    const usersDoc = res.docs;
    const notRecommendedIds = [currentUserId, ...followingIds];

    usersDoc.forEach((userDoc) => {
      if (!userDoc.exists || notRecommendedIds.includes(userDoc.id)) {
        return;
      }

      users[userDoc.id] = userDoc.data();
    });

    return users;
  } catch (error) {
    throw error;
  }
}

export async function getAllUsers() {
  const usersDocument = await firestore()
    .collection('users')
    .get()
    .catch((error) => {
      throw error;
    });

  const allUsers = [];

  usersDocument.forEach((doc) => {
    allUsers.push(doc.data());
  });

  return allUsers;
}

export async function follow(userId, targetId) {
  try {
    const userRef = firestore().collection('users').doc(userId);
    const targetUserRef = firestore().collection('users').doc(targetId);

    const updateUserFollowing = userRef.update({
      following: firestore.FieldValue.arrayUnion(targetId),
    });

    const updateTargetUserFollowers = targetUserRef.update({
      followers: firestore.FieldValue.arrayUnion(userId),
    });

    return Promise.all([updateUserFollowing, updateTargetUserFollowers]);
  } catch (error) {
    console.log('error following', error.message);
  }
}

export async function unfollow(userId, targetId) {
  try {
    const userRef = firestore().collection('users').doc(userId);
    const targetUserRef = firestore().collection('users').doc(targetId);

    const updateUserUnfollowing = userRef.update({
      following: firestore.FieldValue.arrayRemove(targetId),
    });

    const updateTargetUserFollowers = targetUserRef.update({
      followers: firestore.FieldValue.arrayRemove(userId),
    });

    return Promise.all([updateUserUnfollowing, updateTargetUserFollowers]);
  } catch (error) {
    console.log('error unfollowing', error.message);
  }
}

export async function getUserFweets(userId) {
  try {
    const userFweetsRef = firestore()
      .collection('users')
      .doc(userId)
      .collection('fweets');

    const userFweetsRes = await userFweetsRef.get();
    if (userFweetsRes.empty) {
      return {};
    }

    const userFweets = {};

    userFweetsRes.docs.forEach((doc) => {
      userFweets[doc.id] = { id: doc.id, ...doc.data() };
    });

    return userFweets;
  } catch (error) {
    throw error;
  }
}

export function listenFweetUpdate(userId, fweetId, updateCall) {
  const fweetRef = firestore()
    .collection('users')
    .doc(userId)
    .collection('fweets')
    .doc(fweetId);

  return fweetRef.onSnapshot((snapshot) => {
    if (!snapshot.exists) {
      return;
    }

    const fweetData = snapshot.data();
    updateCall(userId, fweetId, fweetData);
  });
}

export async function loadUsers(ids = []) {
  if (!Array.isArray(ids)) {
    return Promise.reject('Not an array');
  }

  if (ids.length === 0) {
    return [];
  }

  try {
    const users = {};
    const usersDoc = [];

    for (let i = 0; i < ids.length; i++) {
      const userId = ids[i];
      const userDocRef = firestore().collection('users').doc(userId);
      const userDoc = await userDocRef.get();

      if (!userDoc.exists) {
        continue;
      }

      usersDoc.push(userDoc);
    }

    for (let i = 0; i < usersDoc.length; i++) {
      const currentUserDoc = usersDoc[i];
      const currentUser = currentUserDoc.data();
      const currentUserFweets = {};

      const fweetsRef = firestore()
        .collection('users')
        .doc(currentUser.id)
        .collection('fweets');

      // Get fweets for current user
      try {
        const fweetsRes = await fweetsRef.get();

        if (fweetsRes.empty) {
          currentUser.fweets = currentUserFweets;
          users[currentUser.id] = currentUser;
          continue;
        }

        fweetsRes.docs.forEach((fweetDoc) => {
          currentUserFweets[fweetDoc.id] = {
            id: fweetDoc.id,
            ...fweetDoc.data(),
          };
        });

        currentUser.fweets = currentUserFweets;
        users[currentUser.id] = currentUser;
      } catch (error) {
        currentUser.fweets = currentUserFweets;
        users[currentUser.id] = currentUser;
        console.log('Loading user fweet error', error.message);
      }
    }

    return users;
  } catch (error) {
    return error;
  }
}

export function timestamp() {
  return firestore.Timestamp;
}

export async function like(userId, targetUserId, targetFweetId, likeId) {
  const userRef = firestore().collection('users').doc(userId);
  const targetFweetRef = firestore()
    .collection('users')
    .doc(targetUserId)
    .collection('fweets')
    .doc(targetFweetId);

  try {
    const updateUser = await userRef.update({
      likes: firestore.FieldValue.arrayUnion(likeId),
    });
    const updateTargetFweet = await targetFweetRef.update({
      likes: firestore.FieldValue.increment(1),
    });

    return Promise.all([updateUser, updateTargetFweet]);
  } catch (error) {
    console.log('error firestore liking', error.message);
    throw error;
  }
}

export async function unlike(userId, targetUserId, targetFweetId, likeId) {
  const userRef = firestore().collection('users').doc(userId);
  const targetFweetRef = firestore()
    .collection('users')
    .doc(targetUserId)
    .collection('fweets')
    .doc(targetFweetId);

  try {
    const updateUser = await userRef.update({
      likes: firestore.FieldValue.arrayRemove(likeId),
    });
    const updateTargetFweet = await targetFweetRef.update({
      likes: firestore.FieldValue.increment(-1),
    });

    return Promise.all([updateUser, updateTargetFweet]);
  } catch (error) {
    console.log('error firestore liking', error.message);
    throw error;
  }
}

export async function reply(
  currentUserId,
  fweetUserId,
  fweetId,
  reply,
  replyTo = null
) {
  try {
    const currentUserRef = firestore().collection('users').doc(currentUserId);
    const fweetRef = firestore()
      .collection('users')
      .doc(fweetUserId)
      .collection('fweets')
      .doc(fweetId);

    const timestampNow = timestamp().now();
    let replyId = '';
    let newReply = {};

    if (!replyTo) {
      replyId +=
        fweetUserId + fweetId + currentUserId + timestampNow.nanoseconds;
    } else {
      replyId += replyTo.parentId + currentUserId + timestampNow.nanoseconds;
      newReply.to = {
        parentId: replyTo.parentId,
        userId: replyTo.userId,
        username: replyTo.username,
      };
    }

    newReply = {
      ...newReply,
      id: replyId,
      userId: currentUserId,
      name: reply.name,
      username: reply.username,
      text: reply.text,
      pictureUrl: reply.pictureUrl,
      dateCreated: timestampNow.toDate(),
    };

    const currentUserReply = {
      id: replyId,
      fweetId: fweetId,
      fweetUserId: fweetUserId,
    };

    const addUserReply = await currentUserRef.set(
      {
        replies: firestore.FieldValue.arrayUnion(currentUserReply),
      },
      {
        merge: true,
      }
    );

    const addFweetReply = await fweetRef.set(
      {
        replies: firestore.FieldValue.arrayUnion(newReply),
      },
      { merge: true }
    );

    return Promise.all([addUserReply, addFweetReply]);
  } catch (error) {
    throw error;
  }
}

export async function searchUsers(username, searchText) {
  try {
    const limit = 5;
    const searchRef = firestore()
      .collection('users')
      .where('username', '>=', searchText)
      .where('username', '<=', searchText + '\uf8ff')
      .where('username', '!=', username)
      .limit(limit);

    const res = await searchRef.get();

    if (res.empty) {
      return {};
    }

    const users = {};
    const usersDoc = res.docs;
    usersDoc.forEach((doc) => {
      users[doc.id] = doc.data();
    });

    return users;
  } catch (error) {
    console.log('error searching users', error);
  }
}
