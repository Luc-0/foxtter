import { storage } from '../services/firebase';

export async function uploadImage(userId, imageFile) {
  try {
    const path = `images/${userId}/${imageFile.name}`;
    const ref = storage().ref(path);
    const metadata = {
      contentType: `${imageFile.type}`,
    };

    const uploadTask = await ref.put(imageFile, metadata);

    const uploadUrlRes = await uploadTask.ref.getDownloadURL();

    return uploadUrlRes;
  } catch (error) {
    console.log('error uploading image', error);
  }
}
