
import express, { Router } from "express";
import authenticateToken from "../models/authenticateToken";
import cloudinary from "../config/cloudinary";
import upload from "../config/multer";
import singleUpload from "../config/multer";
import { uploadPhotoMiddleware } from "../controllers/auth";
const router = express.Router();


// controllers
const {

  signup,
  signin,
  resetPassword,
  jobposts,
  jobposts2,
  search,
  Skills,
  Experiences,
  SkillsDelete,
  ExperiencesDelete,
  preferences,
  updateImage,
  getFilterJobs,
  SavePhotoUrl,
 
  
  
} = require("../controllers/auth");


router.get("/P", (req, res) => {  
  return res.json({
    status:(200).send({ message: 'Hello, World!', status: 'Success' }),  
    data: "hello world from fadi auth API",
  });
});
router.post('/updateImage',updateImage);

router.post('/upload-photo',uploadPhotoMiddleware, SavePhotoUrl);
router.post("/preferences",preferences);
router.post("/preferences",preferences);
 router.post("/signup",signup);
router.post("/signin", signin);
router.post("/reset-password", resetPassword);
router.post('/jobposts', jobposts);
router.get('/jobposts2', jobposts2);
router.post("/search", search);
router.post('/Skills', Skills);
router.post('/Experiences', Experiences);
router.delete('/SkillsDelete',SkillsDelete);
router.delete('/ExperiencesDelete',ExperiencesDelete);
router.post('/getFilterJobs',getFilterJobs);


export default router;
