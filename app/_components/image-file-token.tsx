"use client ";
import React from "react";
import { uploadToBlob } from "../utils/uploadToBlob";

const ImageUpload = ({ value, returnUrl }: any) => {
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const { url } = await uploadToBlob(file);
    returnUrl(url);
  };
  return (
    <div>
      <label className="flex justify-center text-lg items-center py-5  border-2 border-black border-dashed cursor-pointer">
        Upload Images!
        <input type="file" onChange={handleFileUpload} hidden />
      </label>
    </div>
  );
};

export default ImageUpload;
