import express from "express";
const router = express.Router();
import { getTeams, getMatch } from "../controllers/h55eventController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/teams").get(protect, getTeams);
router.route("/match").get(protect, getMatch);

export default router;
