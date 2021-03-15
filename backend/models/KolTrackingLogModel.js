import mongoose from "mongoose";

const kolTrackingLogSchema = new mongoose.Schema(
  {
    channel_id: String,
    view_count: Number,
    subscriber_count: Number,
    video_count: Number,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const KolTrackingLog = mongoose.model("KolTrackingLog", kolTrackingLogSchema);

export default KolTrackingLog;
