import asyncHandler from "express-async-handler";
import Role from "../models/roleModel.js";

// @desc    Get all roles
// @route   GET /api/manage/role/list
// @access  Private/Admin
const getRoles = asyncHandler(async (req, res) => {
  const roles = await Role.find({});
  res.json(roles);
});

// @desc    Get single role
// @route   GET /api/manage/role/id/:id
// @access  Private/Admin
const getRolebyId = asyncHandler(async (req, res) => {
  const role = await Role.findById(req.params.id);
  if (role) {
    res.json(role);
  } else {
    res.status(404);
    throw new Error("role not found");
  }
});

// @desc    Create a new role
// @route   POST /api/manage/role
// @access  Private/Admin
const createRole = asyncHandler(async (req, res) => {
  console.log("createRole", req.body);
  const { roleName, roleDesc, parent, id } = req.body;

  if (id) {
    const role = await Role.findById(id);

    if (role) {
      role.roleName = req.body.roleName || role.roleName;
      role.roleDesc = req.body.roleDesc || role.roleDesc;
      role.parent = req.body.parent;

      const updatedRole = await role.save();

      res.json(updatedRole);
    } else {
      res.status(404);
      throw new Error("Role not found");
    }
  } else {
    const roleExists = await Role.findOne({ roleName });
    if (roleExists) {
      res.status(400);
      throw new Error("新增失敗, 角色名稱已存在, 請改用其他角色名稱");
    }

    const role = await Role.create({
      roleName,
      roleDesc,
      parent,
    });

    if (role) {
      res.status(201).json(role);
    } else {
      res.status(400);
      throw new Error("Invalid Role data");
    }
  }
});

// @desc    Update role
// @route   PUT /api/manage/role/id/:id
// @access  Private/Admin
const updateRole = asyncHandler(async (req, res) => {
  const role = await Role.findById(req.params.id);

  if (role) {
    role.roleName = req.body.roleName || role.roleName;
    role.roleDesc = req.body.roleDesc || role.roleDesc;
    role.parent = req.body.parent;

    const updatedRole = await role.save();

    res.json(updatedRole);
  } else {
    res.status(404);
    throw new Error("Role not found");
  }
});

// @desc    Delete role
// @route   DELETE /api/manage/role/id/:id
// @access  Private/Admin
const deleteRole = asyncHandler(async (req, res) => {
  const role = await Role.findById(req.params.id);

  if (role) {
    await role.remove();
    console.log({ message: "角色移除成功", deletedId: req.params.id });

    res.json({ message: "角色移除成功", deletedId: req.params.id });
  } else {
    res.status(404);
    throw new Error("角色不存在");
  }
});

export { getRoles, getRolebyId, createRole, updateRole, deleteRole };
