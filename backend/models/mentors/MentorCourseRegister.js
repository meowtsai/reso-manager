import mongoose from "mongoose";

// const courseSchema = mongoose.Schema({
//   id: { type: String, required: true },
//   title: { type: String, required: true },
//   desc: { type: String, required: true },
//   fee: { type: Number, required: true },
//   time: { type: String, required: true },
//   seats: { type: Number, required: true },
//   img: { type: String, required: true },
// });

const MentorCourseRegisterSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Mentor",
    },
    checkId: {
      type: String,
      required: true,
    },
    registerDate: { type: Date, required: true },
    timeSlot: {
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

    discordAccount: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    roleData1: {
      type: String,
      required: true,
    },
    roleData2: {
      type: String,
    },
    ip: {
      type: String,
      required: true,
    },

    note: {
      type: String,
    },
    status: {
      type: Number,
      enum: [1, 2, 4, 9], //1-初始  2-已回報 4-已經確認 9 取消資格
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const MentorCourseRegister = mongoose.model(
  "MentorCourseRegister",
  MentorCourseRegisterSchema
);

export default MentorCourseRegister;
