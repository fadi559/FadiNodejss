import dotenv from 'dotenv';
dotenv.config();

import express from "express"; 
import cors from "cors";
import mongoose from "mongoose";
import { DATABASE } from "./config";
import authRoutes from "./routes/auth";
import bodyParser from "body-parser";
import multer from "multer"; 
import morgan from "morgan"; 
 
 import { v2 as cloudinary } from 'cloudinary';

 
 
 


const app = express();


mongoose.set("strictQuery", false); 
mongoose
  .connect(DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// middlewares
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cloudinary.config({
//   cloud_name:process.env.CLOUDINARY_NAME,
//   api_key:process.env.CLOUDINARY_API_KEY,
//   api_secret:process.env.CLOUDINARY_SECRET,
// })



 

app.use("/api", authRoutes);

app.get('/BB', (req, res) => {
  res.send('Hello from my app!');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));







// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import { DATABASE } from "./config";
// import authRoutes from "./routes/auth";
// import bodyParser from "body-parser";

// const morgan = require("morgan");

// const app = express();

// // db connection
// mongoose.set("strictQuery", false); // required for version 6
// mongoose
//   .connect(DATABASE)
//   .then(() => console.log("DB connected"))
//   .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// // middlewares
// app.use(express.json({ limit: "4mb" }));
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.use(morgan("dev"));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// multer({
//   limits: {fieldSize: 25 * 1024 * 1024},
// });

// const Storage = multer.diskStorage({
//   destination(req, file, callback) {
//     callback(null, './images');
//   },
//   filename(req, file, callback) {
//     callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
//   },
// });

// // route middlewares
// app.use("/api", authRoutes);



// app.get('/BB', (req, res) => {
//   res.send('Hello from my app!');
// });

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// //  app.listen(8000,() => console.log("Server running on port 8000"));
