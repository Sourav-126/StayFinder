export const uploadToBlob = async (file) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/v1/upload?filename=${file.name}`,
    {
      method: "POST",
      body: file,
    }
  ).then((res) => res.json());
};
