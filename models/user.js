
import mongoose from "mongoose";


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

    role: {
      type: String,
      default: "Subscriber",
    },
    image: {
      public_id: "",
      url: "",
    },
    resetCode: "",

  },
  { timestamps: true },

);

export default mongoose.model("User", userSchema);
