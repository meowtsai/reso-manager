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
    type: String,
    default: "",
  },
});

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;
