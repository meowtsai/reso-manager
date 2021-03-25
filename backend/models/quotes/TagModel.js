import mongoose from "mongoose";
const TagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tag = mongoose.model("Tag", TagSchema);

export default Tag;
