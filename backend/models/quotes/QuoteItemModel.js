import mongoose from "mongoose";
const QuoteItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      enum: [
        "youtube",
        "facebook",
        "instagram",
        "twitch",
        "tiktok",
        "個人",
        "其他",
      ],
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const QuoteItem = mongoose.model("QuoteItem", QuoteItemSchema);

export default QuoteItem;
