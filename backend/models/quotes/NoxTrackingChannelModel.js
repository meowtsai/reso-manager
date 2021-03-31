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
    averageViews: {
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
    estMonthEarning: {
      type: Number,
    },
    subscriberRanking: {
      type: Number,
    },
    subscriberCountryRanking: {
      type: Number,
    },
    lastThirtyVideoDisLikes: {
      type: Number,
    },
    lastThirtyVideoLikes: {
      type: Number,
    },
    estOneVideoEarning: {
      type: Number,
    },
    estViewsPerVideo: {
      type: Number,
    },
    lastThirtyVideoViews: {
      type: Number,
    },
    socialContacts: [String],
    registerYouTubeDate: {
      type: String,
    },
    estMonthCPM: {
      type: Number,
    },
    estOneVideoCPM: {
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
