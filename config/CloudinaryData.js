import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';


// Configure Cloudinary
cloudinary.config({
  cloud_name: 'doa8c4cs4',
  api_key: '479475179974499',
  api_secret: '1xnaeO4UGw0SByV58IURNkfOavQ',
});

// cloudinary.config({

//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile_photos', 
    allowed_formats: ['jpg', 'png'], 
  },
});

const upload = multer({ storage: storage });

export default upload;
