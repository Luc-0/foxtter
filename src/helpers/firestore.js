import { firestore } from '../services/firebase';

export async function createNewUserDoc(uid, name) {
  const username = await createValidUsername(name);

  firestore().collection('users').doc(uid).set({
    id: uid,
    name: name,
    username: username,
    fweets: [],
    likes: [],
    following: [],
    followers: [],
  });
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