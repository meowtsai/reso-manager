import mongoose from "mongoose";
const ChannelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: false,
    },
    categories: { type: Array, default: [] },
    intro: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    socials: {
      youtube: { type: String },
      facebook: { type: String },
      instagram: { type: String },
      twitch: { type: String },
      tiktok: { type: String },
    },

    status: { type: Number, required: true, default: 1 },
  },
  {
    timestamps: true,
  }
);

const Channel = mongoose.model("Channel", ChannelSchema);

export default Channel;
