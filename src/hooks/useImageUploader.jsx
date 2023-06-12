import { useState } from "react";
import axios from "axios";

const imageToken = import.meta.env.VITE_imageToken;
const useImageUploader = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (imageFile) => {
    console.log("Image Token:", imageToken);
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", imageFile);
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imageToken}`,
        formData
      );
      if (response.data && response.data.data && response.data.data.url) {
        console.log(response.data.data.url);
        setUploadedImage(response.data.data.url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  return { uploadedImage, uploading, uploadImage };
};

export default useImageUploader;
