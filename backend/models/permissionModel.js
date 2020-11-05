import mongoose from "mongoose";

const permissionSchema = mongoose.Schema({
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
  resource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resource",
    required: true,
  },
  operations: {
    type: String,
    default: "",
  },
});

const Permission = mongoose.model("permission", permissionSchema);

export default Permission;
