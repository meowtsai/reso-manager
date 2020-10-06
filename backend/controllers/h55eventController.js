import asyncHandler from "express-async-handler";
import H55eventForm from "../models/H55eventFormModel.js";
import H55MatchForm from "../models/H55eventMatchModel.js";

// @desc    Get all teams
// @route   GET /api/h55event/team
// @access  Private/Admin
const getTeams = asyncHandler(async (req, res) => {
  const teams = await H55eventForm.find({}).sort({ date: -1 });
  res.json(teams);
});

const getMatch = asyncHandler(async (req, res) => {
  const matches = await H55MatchForm.find({}).sort({ date: -1 });
  res.json(matches);
});

export { getTeams, getMatch };
