import mongoose from "mongoose";
const SocialDataSchema = new mongoose.Schema(
  {
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Channel",
    },
    platform: {
      type: String,
      enum: ["youtube", "facebook", "instagram", "twitch", "tiktok"],
    },
    count: {
      type: Number,
      required: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const SocialData = mongoose.model("SocialData", SocialDataSchema);

export default SocialData;
