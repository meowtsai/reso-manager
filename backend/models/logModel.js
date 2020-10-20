import mongoose from "mongoose";

const logSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },

  log_time: {
    type: Date,
    default: Date.now,
  },
  event: {
    type: String,
    required: true,
  },
});

const Log = mongoose.model("Log", logSchema);

export default Log;
