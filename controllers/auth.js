
import User from "../models/user";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";
import nanoid from "nanoid";
import JobPost from '../models/post'



// sendgrid
// require("dotenv").config();
// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.SENDGRID_KEY);



export const signup = async (req, res) => {
  
  console.log("HIT SIGNUP");
  try {
    // validation
    const { name, email,phoneNumber,password } = req.body;
    // 
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }
    if (!email) {
      return res.json({
        error: "Email is required",
      });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be 6 characters long",
      });
    }
    if (!phoneNumber) {
      return res.json({
        error: "phoneNumber is required",
      });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is taken",
      });
    }

    const hashedPassword = await hashPassword(password);
    try {
      const user = await new User({
       
        phoneNumber,
        name,
        email,
        password:hashedPassword,
      }).save();

      // create signed token
      const token = jwt.sign({ _id: user._id }, "fadi99", {
        expiresIn: "7d",
      });

      //   console.log(user);
      const { password, ...rest } = user._doc;
      return res.json({
        token,
        user: rest,
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};
// .catch(error => {
//   res.status(500).json({error: true , message:error.message});

    

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { userId } = req.body;
    
    // check if our db has user with that email
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
       
        error: "No user found",
      });
    }
    

    // check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({
        error: "Wrong password",
      });
    }
    // create signed token
    // const token = jwt.sign({ _id: user._id }, "fadi99", {
    //   expiresIn: "7d",
    // });

    user.password = undefined;
    // user.secret = undefined;
    res.status(200).json({
      // token,
      user,
    });
    // if (userId === 'user123') {
    //   res.status(200).send({ message: 'Login successful', token: 'yourJWTtokenHere' });
    // } else {
    //   res.status(401).send({ message: 'Unauthorized' });
    // };

  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { email, password, resetCode } = req.body;
    // find user based on email and resetCode
    const user = await User.findOne({ email, resetCode });
    // if user not found
    if (!user) {
      return res.json({ error: "Email or reset code is invalid" });
    }
    // if password is short
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be 6 characters long",
      });
    }
    // hash password
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.resetCode = "";
    user.save();
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const jobposts = async (req, res) => {
 
  console.log("req.body1: " , req.body);
 
   const user = (req.body.User && req.body._id) 
   
  try {
    const jobPost = new JobPost({ ...req.body, user:user}) 
    await jobPost.save();
    res.status(201).send(jobPost);
  } catch (error) {
    res.status(400).json({error : error.message});
  }
};

export const jobposts2= async (req, res) => {
 
  try {
    const jobPosts = await JobPost.find({})
    const jobs = []
    for (const jobPost of jobPosts) {
      const user = await User.findById(jobPost.User)
      const job = jobPost.toObject()
      jobs.push({...job , User: user})
    }

    // console.log("jobs: " , jobs);
    
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const search = async (req, res)=>{
  const {searchTerm} = req.body
  console.log('body2',req.body);
   if (!searchTerm) {
    return res.status(400).json({ message: 'Search term is required' });
 }
  try {
    const user = await User.find({

      name: { $regex: searchTerm, $options: 'i' }, 
    });
    res.json(user);
    return;
  } catch (error) {
    res.status(500).send({ message: 'Error searching for users', error: error.message });
  }
};

export const Skills =async(req,res)=>{
  const { skill , userId } = req.body;

     User.findByIdAndUpdate(req.body.userId, {
      $push: { skills: skill }
    })
    // res.status(200).send('Skill added')
    .then( async (updateRes) => {
      const userFromDB = await User.findById(userId)
      res.status(200).json({user: userFromDB})
    })
    .catch(error => {
      res.status(500).json({error: true , message:error.message});
    })
};

export const SkillsDelete =async(req,res)=>{
const { id, skill } = req.query || {};

console.log("req.params: " , req.query);

    try {
        const user = await User.findByIdAndUpdate(id, { $pull: { skills: skill }  } , { new: true }, );

        if (!user) {
            return res.status(507).json({ message: 'User not found'});
        }

        console.log("useR: " ,user);

        res.status(200).json(user.skills);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', message:error.message });
    }
};



export const ExperiencesDelete =async(req,res)=>{
  const { id, experience } = req.query || {};
  
  console.log("req.paramsexp: " , req.query);
  
      try {
          const user = await User.findByIdAndUpdate(id, { $pull: { experiences: experience}  } , { new: true }, );
  
          if (!user) {
              return res.status(507).json({ message: 'User not found'});
          }
  
          console.log("user: " , user);
  
          res.status(200).json(user.experiences);
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error', message:error.message });
      }
  };

  export const Experiences =async(req,res)=>{
  
    const { experience,userId } = req.body;
    
      await User.findByIdAndUpdate(req.body.userId, { 
        $push: { experiences: experience }
      })
      .then( async (updateRes)=>{
        const userFromDB = await User.findById(userId)
        res.status(200).json({user: userFromDB})
      })
      .catch(error => {
        res.status(500).json({error: true , message:error.message});
  
      })
    }
  
  


// export const test=(req,res)=>{
  
//   res.json([
//     { id: 1, name: 'John Doe' },
//     { id: 2, name: 'Jane Doe' }
//   ]);
// };



// export const forgotPassword = async (req, res) => {
  //   const { email } = req.body;
  //   // find user by email
  //   const user = await User.findOne({ email });
  //   console.log("USER ===> ", user);
  //   if (!user) {
  //     return res.json({ error: "User not found" });
  //   }
  //   // generate code
  //   const resetCode = nanoid(5).toUpperCase();
  //   // save to db
  //   user.resetCode = resetCode;
  //   user.save();
  //   // prepare email
  //   const emailData = {
  //     from: process.env.EMAIL_FROM,
  //     to: user.email,
  //     subject: "Password reset code",
  //     html: "<h1>Your password  reset code is: {resetCode}</h1>"
  //   };
  //   // send email
  //   try {
  //     const data = await sgMail.send(emailData);
  //     console.log(data);
  //     res.json({ ok: true });
  //   } catch (err) {
  //     console.log(err);
  //     res.json({ ok: false });
  //   }
   
  
// 