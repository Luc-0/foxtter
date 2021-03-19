import { firestore } from '../services/firebase';

export async function createFweet(userId, fweet) {
  const userFweetsRef = firestore()
    .collection('users')
    .doc(userId)
    .collection('fweets');

  return userFweetsRef.add(fweet);
}

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
