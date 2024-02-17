
import User from "../models/user";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";
import nanoid from "nanoid";
import Post from'../models/post';




// sendgrid
// require("dotenv").config();
// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.SENDGRID_KEY);

export const signup = async (req, res) => {
  console.log("HIT SIGNUP");
  try {
    // validation
    const { name, email,PhoneNumber,password } = req.body;
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
    if (!PhoneNumber) {
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
        // this new pho
        PhoneNumber,
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

export const signin = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;
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
    const token = jwt.sign({ _id: user._id }, "fadi99", {
      expiresIn: "7d",
    });

    user.password = undefined;
    user.secret = undefined;
    res.json({
      token,
      user,
    });
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



   export const profileUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user profile" });
  }
};



export const ueserId =async (req, res) => {
  
  try {
    const loggedInUserId = req.params.userId;

    //fetch the logged-in user's connections
    const loggedInuser = await User.findById(loggedInUserId).populate(
      "connections",
      "_id"
    );
    if (!loggedInuser) {
      return res.status(400).json({ message: "User not found" });
    }

    //get the ID's of the connected users
    const connectedUserIds = loggedInuser.connections.map(
      (connection) => connection._id
    );

    //find the users who are not connected to the logged-in user Id
    const users = await User.find({
      _id: { $ne: loggedInUserId, $nin: connectedUserIds },
    });

    res.status(200).json(users);
  } catch (error) {
    console.log("Error retrieving users", error);
    res.status(500).json({ message: "Error retrieving users" });
  }
};


export const jobposts = async (req, res) => {
  try {
    const jobPost = new JobPost({ ...req.body, createdBy: req.user._id }); // Assuming you have middleware to authenticate and add user to req
    await jobPost.save();
    res.status(201).send(jobPost);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const jobposts2= async (req, res) => {

  try {
    const jobPosts = await JobPost.find({});
    res.send(jobPosts);
  } catch (error) {
    res.status(500).send(error);
  }
};





// seocned try 

  // export  const CreatPost =async (req, res) => {

  // try {
  //   const { job, userId } = req.body;

  //   const newPostData = {
  //     user: userId,
  //   };

  //   if (job) {
  //     newPostData.job = job;
  //   }

  //   const newPost = new Post(newPostData);

  //   await newPost.save();

  //   res.status(200).json({ message: "Post saved successfully" });
  // } catch (error) {
  //   res.status(500).json({ message: "post creation failed" });
  // }
  // };


// first try

// export  const CreatPost =async (req, res) => {
//     try {
//       const { job, userId } = req.body;

//       const newPost = new Post({
//         job : job,
//         user: userId,
//       });

//       await newPost.save();

//       res
//         .status(201)
//         .json({ message: "Post created successfully", post: newPost });
        
//     } catch (error) {
//       console.log("error creating the post", error);
//       res.status(500).json({ message: "Error creating the post" });
//     }
//   };


  export const All = async (req, res) => {
    try {
      const posts = await Post.find().populate("user", "name profileImage");
  
      res.status(200).json({ posts });
    } catch (error) {
      console.log("error fetching all the posts", error);
      res.status(500).json({ message: "Error fetching all the posts" });
    }
  };
  


// export const authToken =async(req,res)=>{
//   const token = jwt.sign({ _id: user._id }, "fadi99", {
//     expiresIn: "7d",
//   });

//   if (authToken === token) { // Replace 'your-auth-token' with actual token
//     res.json({ success: true, message: 'Authentication successful' });
//   } else {
//     res.status(401).json({ success: false, message: 'Authentication failed' });
//   }
// }

//  export const phoneNumber =async(req,res)=>{

//   try {
 
//   const existingPhoneNumber = await PhoneNumber.findOne({ phoneNumber });
//   if (existingPhoneNumber) {
//     return res.status(400).json({ error: 'Phone number already exists' });
//   }
//   const newPhoneNumber = new PhoneNumber({ phoneNumber });
//   await newPhoneNumber.save();
//   res.status(201).json(newPhoneNumber);
// } catch (error) {
//   console.error('Error storing phone number:', error);
//   res.status(500).json({ error: 'Internal server error' });
// }
// };
// export const pohonett =async(req,res)=>{
  
// };




export const forgotPassword = async (req, res) => {
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
   };
  
