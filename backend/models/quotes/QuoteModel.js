import mongoose from "mongoose";
const QuoteSchema = new mongoose.Schema(
  {
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Channel",
    },
    date: {
      type: String,
      required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "QuoteItem",
    },
    purchasePrice: {
      type: Number,
      required: false,
    },
    marketPrice: {
      type: Number,
      required: false,
    },

    platform: {
      type: String,
      enum: ["youtube", "facebook", "instagram", "twitch", "tiktok"],
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Quote = mongoose.model("Quote", QuoteSchema);

export default Quote;
