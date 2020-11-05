import mongoose from "mongoose";

const resourceSchema = mongoose.Schema({
  resourceName: {
    type: String,
    required: true,
    unique: true,
  },
  resourceDesc: {
    type: String,
    required: true,
  },
  operationList: {
    type: String,
    default: "",
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resource",
    default: "",
  },
});

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;
