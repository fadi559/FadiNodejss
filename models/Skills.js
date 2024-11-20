import mongoose from "mongoose";
import slugify from "slugify";

const { Schema } = mongoose;

const skillSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    //   unique: true,
      validate: {
        validator: function (v) {
          return v != null && v !== "";
        },
        message: "Name cannot be null or undefined",
      },
    },
  },
  { timestamps: true }
);

skillSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.name = slugify(this.name, {
      replacement: " ",
      lower: false,
      strict: true,
      trim: true,
    });
  }
  next();
});

export default mongoose.model("skill", skillSchema);