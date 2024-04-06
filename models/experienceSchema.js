
import mongoose from "mongoose";
const { Schema } = mongoose;


const ExperienceSchema = new Schema(
    {
    
  title: String,
  company: String,
  startDate: Date,
  endDate: Date,
  description: String,

}
);

export default mongoose.model("Experience",ExperienceSchema);