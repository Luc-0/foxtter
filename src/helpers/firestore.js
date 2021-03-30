import { firestore } from '../services/firebase';

export async function createFweet(userId, fweet) {
  const userFweetsRef = firestore()
    .collection('users')
    .doc(userId)
    .collection('fweets');

  return userFweetsRef.add(fweet);
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

export async function getRecommendedUsers(
  currentUserId,
  followingIds,
  recommendedLimit
) {
  try {
    const recommendUsersRef =
      Array.isArray(followingIds) && followingIds.length > 0
        ? firestore()
            .collection('users')
            .where('id', 'not-in', [currentUserId, ...followingIds])
            .limit(recommendedLimit)
        : firestore().collection('users').limit(recommendedLimit);

    const users = {};
    const res = await recommendUsersRef.get();

    if (res.empty) {
      return users;
    }

    const usersDoc = res.docs;
    usersDoc.forEach((userDoc) => {
      if (!userDoc.exists) {
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

export async function follow(currentUserId, targetId) {
  const currentUserRef = firestore().collection('users').doc(currentUserId);

  return currentUserRef.update({
    following: firestore.FieldValue.arrayUnion(targetId),
  });
}

export async function unfollow(currentUserId, targetId) {
  const currentUserRef = firestore().collection('users').doc(currentUserId);

  return currentUserRef.update({
    following: firestore.FieldValue.arrayRemove(targetId),
  });
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

  const usersRef = firestore().collection('users').where('id', 'in', ids);

  try {
    const users = {};
    const res = await usersRef.get();

    if (res.empty) {
      return users;
    }

    const docs = res.docs;

    for (let i = 0; i < docs.length; i++) {
      const userDoc = docs[i];
      const currentUser = userDoc.data();
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
    // res.docs.forEach(async (userDoc) => {
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
  targetId,
  fweetId,
  reply,
  replyTo = null
) {
  try {
    const currentUserRef = firestore().collection('users').doc(currentUserId);
    const fweetRef = firestore()
      .collection('users')
      .doc(targetId)
      .collection('fweets')
      .doc(fweetId);

    if (!replyTo) {
      const timestampNow = timestamp().now();
      const replyId =
        targetId + fweetId + currentUserId + timestampNow.nanoseconds;
      const newReply = {
        id: replyId,
        userId: targetId,
        name: reply.name,
        username: reply.username,
        text: reply.text,
        dateCreated: timestampNow.toDate(),
      };

      const currentUserReply = {
        id: replyId,
        fweetId: fweetId,
        userId: currentUserId,
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
    }

    throw Error('nope');
  } catch (error) {
    console.log('Error replying', error);
  }
}
