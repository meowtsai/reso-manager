import express from "express";
const router = express.Router();
import {
  getTeams,
  getMatch,
  updateMemberGameId,
  deleteTeam,
} from "../controllers/h55eventController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/teams").get(protect, getTeams);

router.route("/update_game_id").put(protect, admin, updateMemberGameId);

router.route("/match").get(protect, getMatch);

router.route("/:id").delete(protect, admin, deleteTeam);

export default router;
