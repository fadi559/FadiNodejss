
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
  jobposts2,
  UsersSearch,
  userId,
  userId1,
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
router.post('/jobposts',jobposts);
router.get('/jobposts2',jobposts2);
 router.get('/UsersSearch,',UsersSearch);
 router.get('/userId,',userId);
 router.get('/userId1,',userId1);







export default router;
