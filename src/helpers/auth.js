import { auth } from '../services/firebase';

export async function signup(email, password) {
  const userCredential = await auth()
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => {
      throw error;
    });

  const user = userCredential.user;

  return user;
}

export async function signIn(email, password) {
  const userCredential = await auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      throw error;
    });
  const user = userCredential.user;

  return user;
}

export async function isEmailAlreadyUsed(email) {
  const signInMethods = await auth()
    .fetchSignInMethodsForEmail(email)
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode, errorMessage);
    });

  if (signInMethods.length === 0) {
    return false;
  }

  if (!signInMethods.includes('password')) {
    return false;
  }

  return true;
}

export function getUserId() {
  const user = auth().currentUser;

  return user ? user.uid : false;
}

export async function signOut() {
  return auth().signOut();
}
