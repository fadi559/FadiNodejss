import mongoose from "mongoose";
const { Schema,ObjectId } = mongoose;

const jobPostSchema = new Schema(
    {
      

     User: { type: String, ref: "User", required: true },
     postedBy:{
        type: mongoose. Schema.ObjectId,
       ref:"User",
     },
    jobType:{
        type:String,
        default:null,
        
      },
      location:{
        type:String,
         default:null,
      },
      notes:{
        type:String,
        default:null,
      },
      Phonenumber:{
        type:String,
        trim: true,
        unique: true,
      },
      datePosted: { type: Date, default: Date.now }
    }
    )

      export default mongoose.model("JobPost",jobPostSchema);
