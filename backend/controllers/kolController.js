import asyncHandler from "express-async-handler";
import Kol from "../models/KolModel.js";
import KolTrackingLog from "../models/KolTrackingLogModel.js";

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getKols = asyncHandler(async (req, res) => {
  const kols = await Kol.find({});
  //找到昨天的數據
  let currentDate = new Date();
  //const yesterday = currentDate.setDate(currentDate.getDate()-1)
  const KolTrackingLogYesterday = await KolTrackingLog.find({});
  res.json({ kols, KolTrackingLogYesterday });
});

export { getKols };
