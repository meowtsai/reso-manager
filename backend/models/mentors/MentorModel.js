import mongoose from "mongoose";
const MentorSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    img: {
      type: String,
      required: true,
    },
    intro: {
      type: String,
      required: true,
    },
    socials: {
      youtube: { type: String },
      facebook: { type: String },
      instagram: { type: String },
      twitch: { type: String },
    },
    wireInfo: {
      account_name: { type: String, required: true },
      bank_name: { type: String, required: true },
      branch_name: { type: String, required: true },
      account_no: { type: String, required: true },
    },
    periods: {
      startDate: { type: Date, required: true },
      endDate: { type: Date },
      weekdays: [{ type: Number, min: 0, max: 6 }],
      timeSlots: [
        {
          type: String,
          enum: [
            "15:00~16:00",
            "16:30~17:30",
            "18:00~19:00",
            "20:00~21:00",
            "21:30~22:30",
            "23:30~24:00",
          ],
        },
      ],
      excludedStartDate: { type: Date },
      excludedEndDate: { type: Date },
    },
    courseId: { type: String, required: true },
    status: { type: Number, required: true, default: 1 },
  },
  {
    timestamps: true,
  }
);

const Mentor = mongoose.model("Mentor", MentorSchema);

export default Mentor;
