import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file buffer to Cloudinary
 * @param {Buffer} fileBuffer - The file buffer to upload
 * @param {String} folder - The folder in Cloudinary to upload to
 * @returns {Promise<Object>} - The Cloudinary upload response
 */
export const uploadToCloudinary = (fileBuffer, folder = "portfolio", options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto", ...options },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    // End the stream with the buffer
    uploadStream.end(fileBuffer);
  });
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return null;
  }
};

export default cloudinary;
