import mongoose from "mongoose";
const { Schema,ObjectId } = mongoose;

const jobPostSchema = new Schema(
    {
      // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      // user: { type: mongoose.Schema.Types.ObjectId, 
      //   ref: 'User', required: true },
  // Timestamps, other fields...

     User: { type: String, ref: "User", required: true },
     postedBy:{
        type: mongoose. Schema.ObjectId,
       ref:"User",
        //  required:true,
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
      Phonenumber:{
        type:String,
        trim: true,
        unique: true,
      },
      datePosted: { type: Date, default: Date.now }
    }
    )


      export default mongoose.model("JobPost",jobPostSchema);
