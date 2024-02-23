import mongoose from "mongoose";
const { Schema } = mongoose;

const jobPostSchema = new Schema(
    {
      // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

     user: { type: String, ref: "user", required: true },
     postedBy:{
        type: mongoose. Schema.ObjectId,
       ref:"user",
       required:true,
     },

    jobType:{
        type:String,
         default:null,
        
      },
      skills:{
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
      phone:{
        type:String,
        
         unique: true,
      },
      datePosted: { type: Date, default: Date.now }
    }
    )


      export default mongoose.model("JobPost",jobPostSchema);
