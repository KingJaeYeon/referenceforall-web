import imageCompression, { Options } from "browser-image-compression";

export default async function compressImage(file: File, fileSizeLimit = 5) {
  const options: Options = {
    maxSizeMB: fileSizeLimit,
    useWebWorker: true,
    maxWidthOrHeight: 1920,
  };

  const isBiggerThan5MB = file.size > 5 * 1024 * 1024;

  if (isBiggerThan5MB) {
    throw new Error("compress_image_size_error");
  }

  try {
    return await imageCompression(file, options);
  } catch (error) {
    throw new Error("compress_image_error");
  }
}
