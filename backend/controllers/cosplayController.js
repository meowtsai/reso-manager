import asyncHandler from "express-async-handler";
import CosplayApply from "../models/CosplayApply.js";
import Log from "../models/logModel.js";
import CosplayScore from "../models/CosplayScoreModel.js";
import EventLog from "../models/EventLogModel.js";

// @desc    Get all apply record
// @route   GET /api/cosplay/role/list
// @access  Private/Admin
const getCosplayApplies = asyncHandler(async (req, res) => {
  const cosplayapplies = await CosplayApply.find({});
  const scores = await CosplayScore.find({ judge: req.user._id });
  const scores_all = await CosplayScore.find({});

  const fbvotes = await EventLog.aggregate([
    { $match: { action: "vote" } },
    { $group: { _id: "$event", count: { $sum: 1 } } },
  ]);

  res.json({ cosplays: cosplayapplies, scores, fbvotes, scores_all });
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
  //console.log(req.body);

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

// @desc    Get coser scoring records by coser id
// @route   GET /api/cosplay/:id/score
// @access  Private/Admin
const getScoreById = asyncHandler(async (req, res) => {
  //console.log(req.params.id);
  const apply = await CosplayApply.findById(req.params.id);
  //user_id: req.user._id,
  if (apply) {
    const scores = await CosplayScore.find({ coser: apply._id });
    //console.log("scores", scores);
    res.json(scores);
  } else {
    res.status(404);
    throw new Error("coser not found");
  }
});

// @desc    POST to add a set of  coser scoring record
// @route   POST /api/cosplay/:id/score
// @access  Private/Admin
const addScoreById = asyncHandler(async (req, res) => {
  const apply = await CosplayApply.findById(req.params.id);
  //user_id: req.user._id,
  const { score_expression, score_creativity, score_display } = req.body;

  if (apply) {
    const exsitedScore = await CosplayScore.find({
      coser: apply._id,
      judge: req.user._id,
    });
    //console.log("exsitedScore", exsitedScore);
    if (exsitedScore.length <= 0) {
      const newScore = await CosplayScore({
        coser: apply._id,
        judge: req.user._id,
        score_expression,
        score_creativity,
        score_display,
      });

      const newLog = new Log({
        user_id: req.user._id,
        event: `${req.user.name} 替Coser(${
          apply.nickname
        })評分: ${JSON.stringify(newScore)}`,
      });

      const addScoreResult = await newScore.save();
      newLog.save();
      //console.log("scores", scores);
      res.json(addScoreResult);
    } else {
      return res.status(401).json({ message: "錯誤的操作,請重新整理" });
    }
  } else {
    res.status(404);
    throw new Error("coser not found");
  }
});

// @desc    PUT to update a set of  coser scoring record
// @route   PUT /api/cosplay/:id/score
// @access  Private/Admin
const updateScoreById = asyncHandler(async (req, res) => {
  const apply = await CosplayApply.findById(req.params.id);
  //user_id: req.user._id,
  const {
    score_expression,
    score_creativity,
    score_display,
    record_id,
  } = req.body;

  if (apply) {
    const exsitedScore = await CosplayScore.findById(record_id);
    if (exsitedScore) {
      exsitedScore.score_expression = score_expression;
      exsitedScore.score_creativity = score_creativity;
      exsitedScore.score_display = score_display;

      const newLog = new Log({
        user_id: req.user._id,
        event: `${req.user.name} 替Coser(${
          apply.nickname
        })修改評分: ${JSON.stringify(exsitedScore)}`,
      });

      const updateScoreResult = await exsitedScore.save();
      newLog.save();

      //console.log("scores", scores);
      res.json(updateScoreResult);
    } else {
      res.status(404);
      throw new Error("exsitedScore not found");
    }
  } else {
    res.status(404);
    throw new Error("coser not found");
  }
});

export {
  getCosplayApplies,
  getCosplayApplyById,
  updateApplyStatus,
  getScoreById,
  addScoreById,
  updateScoreById,
};
