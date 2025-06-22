"use client";

import React from "react";
import { uploadToBlob } from "../utils/uploadToBlob";

type ImageUploadProps = {
  value?: string; // optional if you want to support preview
  returnUrl: (url: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({ returnUrl }) => {
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const { url } = await uploadToBlob(file);
    returnUrl(url);
  };

  return (
    <div>
      <label className="flex justify-center text-lg items-center py-5 border-2 border-black border-dashed cursor-pointer">
        Upload Images!
        <input type="file" onChange={handleFileUpload} hidden />
      </label>
    </div>
  );
};

export default ImageUpload;
