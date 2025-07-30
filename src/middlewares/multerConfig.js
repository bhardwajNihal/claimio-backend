import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig.js';

// cloudinary storage instance - this facilitates direct entry to cloudinary with storing file to local disk
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'user-profiles',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });   // middleware for file upload

export default upload;
