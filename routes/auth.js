
import express, { Router } from "express";
import authenticateToken from "../models/authenticateToken";
import cloudinary from "../config/cloudinary";
import upload from "../config/multer";
import singleUpload from "../config/multer";
import { uploadPhotoMiddleware } from "../controllers/auth";
import { createSkill } from "../controllers/skills.controller";
import { createJobType } from "../controllers/JobType.controller";
const router = express.Router();


// controllers
const {

  signup,
  signin,
  resetPassword,
  jobposts,
  jobposts2,
  search,
  Experiences,
  SkillsDelete,
  ExperiencesDelete,
  preferences,
  updateImage,
  getFilterJobs,
  SavePhotoUrl,
  filterData,
  BothSkills,
  
  
  
} = require("../controllers/auth");


router.get("/P", (req, res) => {  
  return res.json({
    status:(200).send({ message: 'Hello, World!', status: 'Success' }),  
    data: "hello world from fadi auth API",
  });
});
router.post("/filterData",filterData);
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
router.post('/BothSkills', BothSkills);
router.post('/Experiences', Experiences);
router.delete('/SkillsDelete',SkillsDelete);
router.delete('/ExperiencesDelete',ExperiencesDelete);
router.post('/getFilterJobs',getFilterJobs);
router.post("/createSkill",createSkill);
router.post("/createJobType",createJobType);



export default router;
