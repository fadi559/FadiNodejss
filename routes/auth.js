
import express, { Router } from "express";

import authenticateToken from "../models/authenticateToken";


const router = express.Router();

// controllers
const {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  jobposts,
    
  

} = require("../controllers/auth");


router.get("/", (req, res) => {
  return res.json({
    data: "hello world from fadi auth API",
  });
});
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post('/jobposts',jobposts)




export default router;
