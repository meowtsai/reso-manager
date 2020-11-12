import asyncHandler from "express-async-handler";
import Resource from "../models/resourceModel.js";
import Permission from "../models/permissionModel.js";
import Role from "../models/roleModel.js";

// @desc    Get  permissions by user id
// @route   GET /api/manage/permission/:id
// @access  Private/Admin
const getPermissionsByRoleId = asyncHandler(async (req, res) => {
  const resources = await Resource.find({});
  const permissions = await Permission.find({
    role: req.params.id,
  });

  const role = await Role.findById(req.params.id);

  //.populate({ path: "role", select: ["roleName", "roleDesc"] })

  console.log("permissions", permissions);
  res.json({ resources, permissions, role });
});

// @desc    Update user permissions
// @route   POST /api/manage/permission/:id
// @access  Private/Admin
const updateUserPermissions = asyncHandler(async (req, res) => {
  //delete all permissions
  //insert new set of permissions
  console.log(Array.isArray(req.body));
  if (Array.isArray(req.body) && req.body.length > 0) {
    await Permission.remove({ role: req.params.id });

    const insDocs = req.body.map((permission) => ({
      role: req.params.id,
      resource: permission.resource,
      operations: permission.operations.join(","),
    }));

    const insResult = await Permission.insertMany(insDocs);
    res.json(insResult);
  }
  res.status(204);
});

export { getPermissionsByRoleId, updateUserPermissions };

// [
//     { resource: '5f9f742cdd5ee8185cb5a4c1', operations: [ 'read' ] },
//     {
//       resource: '5f9f74ff6ff7f13b8c1e8359',
//       operations: [ 'modify', 'delete' ]
//     }
//   ]
