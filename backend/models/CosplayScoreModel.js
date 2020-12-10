import mongoose from "mongoose";

const CosplayScoreSchema = new mongoose.Schema(
  {
    coser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "CosplayApply",
    },
    judge: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    score_expression: {
      type: Number,
      required: true,
    },
    score_creativity: {
      type: Number,
      required: true,
    },
    score_display: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CosplayScore = mongoose.model("CosplayScore", CosplayScoreSchema);

export default CosplayScore;
