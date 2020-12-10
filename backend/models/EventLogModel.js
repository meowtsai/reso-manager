import mongoose from "mongoose";

const EventLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EventUser",
      required: true,
    },
    event: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const EventLog = mongoose.model("EventLog", EventLogSchema);

export default EventLog;
