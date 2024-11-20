
import mongoose, { Types } from "mongoose";



const { Schema, ObjectId } = mongoose;


const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    skills: [{ type: String, default: [] }],
    
    experiences:[{ type: String, default: [] }],

    interests: { type: String,},

  jobType2: { type: String, },

  currentJob: { type: String, default: null },

  image: {
    type:String,
  },

    role: {
      type: String,
      default: "Subscriber",
    },
    imagee: {
      public_id: "",
      url: "",
    },
     resetCode: "",
     jobPosts: [{ type: ObjectId, ref: "JobPost" }],

  },
  { timestamps: true },

  
);

export default mongoose.model("User", userSchema);
