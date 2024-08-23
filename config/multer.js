
import multer from 'multer';

const storage = multer.memoryStorage();

const singleUpload = multer({ storage }).single('file');


export default singleUpload;



// import multer from 'multer';
//  import path from 'path';


// // Define storage settings
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Destination folder for uploaded files
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // File naming convention
//   }
// });

// const upload = multer({ storage: storage });

// export default upload;


