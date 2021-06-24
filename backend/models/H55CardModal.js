import mongoose from "mongoose";

const H55CardSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: true,
    },
    greetings: {
      type: String,
    },
    selectedCard: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    ip: {
        type: String,
        required: true,
      },
  },
  {
    timestamps: true,
  }
);

const H55Card = mongoose.model("H55Card", H55CardSchema);

export default H55Card;

