import mongoose from "mongoose";

const kolSchema = new mongoose.Schema(
  {
    channel_id: { type: String, required: true, trim: true, unique: true },
    title: String, // String is shorthand for {type: String}
    description: String,
    thumbnails: String,
    country: String,
    view_count: Number,
    subscriber_count: Number,
    video_count: Number,
    published_at: Date,
    hiddenSubscriberCount: Boolean,
  },
  {
    timestamps: true,
  }
);

const Kol = mongoose.model("Kol", kolSchema);

export default Kol;
