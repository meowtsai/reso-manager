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
    required: true,
    default: "",
  },
  parent: {
    type: String,
    required: true,
    default: "",
  },
});

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;
