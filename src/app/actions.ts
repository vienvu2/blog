import { storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const uploadImage = (image: File, setProgress: Function) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
          console.log("File available at", downloadURL);
        });
      }
    );
  });
};
