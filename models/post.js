import mongoose from "mongoose";
const { Schema } = mongoose;

const jobPostSchema = new Schema(
    {

    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },

    job:{
        type:String,
        // default:null,
        
      },
      skills:{
        type:String,
        // default:null,
  
      },
      location:{
        type:String,
        // default:null,
  
      },
      notes:{
        type:String,
        // default:null,
      },
      phone:{
        type:String,
        // default:null,
      },
      datePosted: { type: Date, default: Date.now }
    }
    )


      export default mongoose.model("post",jobPostSchema);
