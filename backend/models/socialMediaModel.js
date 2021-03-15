import mongoose from "mongoose";

const socialMediaSchema = new mongoose.Schema(
  {
    name: String,
    icon: String,
    website: String,
  },
  {
    timestamps: true,
  }
);

const SocialMedia = mongoose.model("SocialMedia", socialMediaSchema);

export default SocialMedia;
