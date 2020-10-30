import mongoose from "mongoose";

const roleSchema = mongoose.Schema({
  roleName: {
    type: String,
    required: true,
    unique: true,
  },
  roleDesc: {
    type: String,
    required: true,
  },
  parent: {
    type: String,
  },
});

const Role = mongoose.model("Role", roleSchema);

export default Role;
