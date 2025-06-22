interface UploadResponse {
  url: string;
  success?: boolean;
  message?: string;
}

export const uploadToBlob = async (file: File): Promise<UploadResponse> => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/v1/upload?filename=${file.name}`,
    {
      method: "POST",
      body: file,
    }
  ).then((res) => res.json());
};
