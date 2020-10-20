import asyncHandler from "express-async-handler";
import H55eventForm from "../models/H55eventFormModel.js";
import H55MatchForm from "../models/H55eventMatchModel.js";
import Log from "../models/logModel.js";

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

// @desc    Update team member game_id
// @route   PUT /api/h55event/update_game_id
// @access  Private

const updateMemberGameId = asyncHandler(async (req, res) => {
  //console.log("updateMemberGameId", req.body);
  const { team_id, game_id, new_game_id, mode } = req.body;

  const team = await H55eventForm.findById(team_id);

  if (team) {
    if (mode === "captain") {
      team.captain_game_id = new_game_id;
    } else {
      const updateIndex = team.members.findIndex((m) => m.game_id === game_id);
      team.members[updateIndex].game_id = new_game_id;
      team.markModified("members");
    }

    const updatedTeam = await team.save();
    //doc.save();
    const newLog = new Log({
      user_id: req.user._id,
      event: `${req.user.name} 將第五人格萬聖節活動報名隊伍隊員(${team.team} ${mode})game_id從${game_id} 改成${new_game_id}`,
    });

    newLog.save();
    res.json(updatedTeam);
  } else {
    res.status(404);
    throw new Error("Team not found");
  }
});

// @desc    Delete team
// @route   DELETE /api/h55event/:id
// @access  Private/Admin
const deleteTeam = asyncHandler(async (req, res) => {
  const team = await H55eventForm.findById(req.params.id);

  if (team) {
    await team.remove();
    const newLog = new Log({
      user_id: req.user._id,
      event: `${req.user.name} 將第五人格萬聖節活動報名隊伍 ${team.team} 刪除`,
    });

    newLog.save();
    res.json({ message: "已經刪除", deleted_id: req.params.id });
  } else {
    res.status(404);
    throw new Error("沒有這個隊伍");
  }
});

export { getTeams, getMatch, updateMemberGameId, deleteTeam };
