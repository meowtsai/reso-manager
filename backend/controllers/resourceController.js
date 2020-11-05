import asyncHandler from "express-async-handler";
import Resource from "../models/resourceModel.js";

// @desc    Get all resources
// @route   GET /api/manage/resource/list
// @access  Private/Admin
const getResources = asyncHandler(async (req, res) => {
  const resources = await Resource.find({});
  res.json(resources);
});

// @desc    Get single resource
// @route   GET /api/manage/resource/:id
// @access  Private/Admin
const getResourcebyId = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);
  if (resource) {
    res.json(resource);
  } else {
    res.status(404);
    throw new Error("資源不存在");
  }
});

// @desc    Create a new resource
// @route   POST /api/manage/resource
// @access  Private/Admin
const createResource = asyncHandler(async (req, res) => {
  const { resourceName, resourceDesc, operationList, parent } = req.body;

  const resourceExists = await Resource.findOne({ resourceName });
  if (resourceExists) {
    res.status(400);
    throw new Error("新增失敗, 資源名稱已存在, 請改用其他名稱");
  }

  const resource = await Resource.create({
    resourceName,
    resourceDesc,
    operationList,
    parent,
  });

  if (resource) {
    res.status(201).json(resource);
  } else {
    res.status(400);
    throw new Error("新增失敗");
  }
});

// @desc    Update resource
// @route   PUT /api/manage/resource/:id
// @access  Private/Admin
const updateResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);

  if (resource) {
    resource.resourceName = req.body.resourceName || role.resourceName;
    resource.resourceDesc = req.body.resourceDesc || role.resourceDesc;
    resource.operationList = req.body.operationList || role.operationList;
    resource.parent = req.body.parent;

    const updatedResource = await resource.save();

    res.json(updatedResource);
  } else {
    res.status(404);
    throw new Error("資源不存在");
  }
});

// @desc    Delete resource
// @route   DELETE /api/manage/resource/:id
// @access  Private/Admin
const deleteResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);

  if (resource) {
    await resource.remove();
    res.json({ message: "資源移除成功" });
  } else {
    res.status(404);
    throw new Error("資源不存在");
  }
});

export {
  getResources,
  getResourcebyId,
  createResource,
  updateResource,
  deleteResource,
};
