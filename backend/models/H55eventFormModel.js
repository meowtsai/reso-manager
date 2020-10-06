import mongoose from "mongoose";
const H55eventFormSchema = new mongoose.Schema({
  team: {
    type: String,
    required: true,
  },
  captain_name: {
    type: String,
    required: true,
  },
  captain_gender: {
    type: String,
    required: true,
  },
  captain_phone_code: {
    type: String,
    required: true,
  },
  captain_phone: {
    type: String,
    required: true,
  },
  captain_line_id: {
    type: String,
    required: true,
  },
  captain_email: {
    type: String,
    required: true,
  },
  verify_code: {
    type: String,
    required: true,
  },
  captain_game_id: {
    type: String,
    required: true,
  },
  captain_game_name: {
    type: String,
    required: true,
  },
  captain_role: {
    type: String,
    required: true,
  },
  captain_birthday: {
    type: Date,
    required: true,
  },
  captain_img1: {
    type: String,
    required: true,
  },
  captain_img2: {
    type: String,
    required: true,
  },
  members: { type: Array, default: [] },
  date: {
    type: Date,
    default: Date.now,
  },
});

const H55eventForm = mongoose.model("H55eventForm", H55eventFormSchema);

export default H55eventForm;
