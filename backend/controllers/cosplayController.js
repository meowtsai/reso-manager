import asyncHandler from "express-async-handler";
import CosplayApply from "../models/CosplayApply.js";

// @desc    Get all apply record
// @route   GET /api/cosplay/role/list
// @access  Private/Admin
const getCosplayApplies = asyncHandler(async (req, res) => {
  const cosplayapplies = await CosplayApply.find({});
  res.json(cosplayapplies);
});

// @desc    Get apply record by id
// @route   GET /api/users/:id
// @access  Private/Admin
const getCosplayApplyById = asyncHandler(async (req, res) => {
  const apply = await CosplayApply.findById(req.params.id);

  if (apply) {
    res.json(apply);
  } else {
    res.status(404);
    throw new Error("apply not found");
  }
});

export { getCosplayApplies, getCosplayApplyById };
