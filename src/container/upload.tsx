import { useState } from "react";
import { storage } from "@/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { uploadImage } from "@/app/actions";

function UploadImage() {
  const [image, setImage] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) return;
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
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <progress value={progress} max="100" />
      {url && <img src={url} alt="Uploaded file" />}
    </div>
  );
}

export default UploadImage;
