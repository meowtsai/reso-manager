import mongoose from "mongoose";
const NoxTrackingChannelSchema = new mongoose.Schema(
  {
    channel: { type: mongoose.Schema.Types.ObjectId, ref: "Channels" },
    title: {
      type: String,
      required: true,
    },
    subscribers: {
      type: Number,
    },
    totalVideos: {
      type: Number,
    },
    totalViews: {
      type: Number,
    },
 
    categories: { type: Array, default: [] },

    thumbnails: {
      type: String,
    },
    countryCode: {
      type: String,
      required: false,
    },
    categories: { type: Array, default: [] },
    languages: {
      type: String,
    },
    noxScore: {
      type: Number,
    },
    estimateViews: {
      type: Number,
    },
    estimatePrice: {
      type: Number,
    },
    subscriberRanking: {
      type: Number,
    },
    subscriberCountryRanking: {
      type: Number,
    },
    
  },
  {
    timestamps: true,
  }
);

const NoxTrackingChannel = mongoose.model(
  "NoxTrackingChannel",
  NoxTrackingChannelSchema
);

export default NoxTrackingChannel;
