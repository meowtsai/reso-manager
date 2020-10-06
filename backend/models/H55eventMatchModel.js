import mongoose from "mongoose";

const H55MatchFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone_code: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  line_id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  game_id: {
    type: String,
    required: true,
  },
  game_name: {
    type: String,
    required: true,
  },

  birthday: {
    type: Date,
    required: true,
  },
  need_hunter: {
    type: Number,
    required: true,
  },
  need_survivor: {
    type: Number,
    required: true,
  },
  own_hunter: {
    type: Number,
    required: true,
  },
  own_survivor: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const H55MatchForm = mongoose.model("H55MatchForm", H55MatchFormSchema);

export default H55MatchForm;
