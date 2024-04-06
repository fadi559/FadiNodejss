
import express, { Router } from "express";

import authenticateToken from "../models/authenticateToken";


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


} = require("../controllers/auth");


router.get("/", (req, res) => {
  return res.json({
    data: "hello world from fadi auth API",
  });
});

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/reset-password", resetPassword);
router.post('/jobposts', jobposts);
router.get('/jobposts2', jobposts2);
router.post("/search", search);
router.post('/Skills', Skills);
router.post('/Experiences', Experiences);














export default router;
