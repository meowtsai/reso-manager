import mongoose from "mongoose";
const CourseSchema = new mongoose.Schema(
  {
    gameId: {
      type: String,
      required: true,
    },
    gameName: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    slogan: {
      type: String,
      required: true,
    },
    subheading: {
      type: String,
      required: true,
    },
    rolefield: {
      type: String,
      required: true,
    },
    pros: [
      {
        title: { type: String, required: true },
        text: { type: String, required: true },
      },
    ],
    courses: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        desc: { type: String, required: true },
        fee: { type: Number, required: true },
        time: { type: String, required: true },
        seats: { type: Number, required: true },
        img: { type: String, required: true },
      },
    ],
    detail: {
      target: [{ type: String, required: true }],
      steps: {},
      notes: [{ type: String, required: true }],
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", CourseSchema);

export default Course;
