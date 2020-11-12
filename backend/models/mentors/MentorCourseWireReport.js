import mongoose from "mongoose";

const MentorCourseWireReportSchema = new mongoose.Schema({
  checkId: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  bankName: {
    type: String,
    required: true,
  },
  wireName: {
    type: String,
    required: true,
  },
  bankCode: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  registerId: {
    type: String,
  },
});

const MentorCourseWireReport = mongoose.model(
  "MentorCourseWireReport",
  MentorCourseWireReportSchema
);

export default MentorCourseWireReport;
