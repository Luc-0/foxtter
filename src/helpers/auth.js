import { auth } from '../services/firebase';
import { createNewUserDoc } from './firestore';

export async function signup(email, password, name) {
  await auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      createNewUserDoc(user.uid, name);
    })
    .catch((error) => {
      throw error;
    });
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
