import asyncHandler from "express-async-handler";
import CosplayApply from "../models/CosplayApply.js";
import Log from "../models/logModel.js";
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

// @desc    Update apply (status)
// @route   PUT /api/h55event/update_game_id
// @access  Private
const updateApplyStatus = asyncHandler(async (req, res) => {
  const {
    apply: { _id, status },
  } = req.body;
  console.log(req.body);

  const apply = await CosplayApply.findById(req.params.id).select({
    nickname: 1,
    status: 1,
  });
  //console.log(apply);
  if (apply) {
    const newLog = new Log({
      user_id: req.user._id,
      event: `${req.user.name} 將第五人格Cosplay活動Coser(${apply.nickname})的狀態從${apply.status} 改成${status}`,
    });
    //console.log(newLog);
    apply.status = status;
    const updatedApply = await apply.save();
    newLog.save();
    //console.log(updatedApply);
    res.json(updatedApply);
  } else {
    res.status(404);
    throw new Error("apply not found");
  }
});

export { getCosplayApplies, getCosplayApplyById, updateApplyStatus };
