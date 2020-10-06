import express from "express";
const router = express.Router();
import { getTeams, getMatch } from "../controllers/h55eventController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/teams").get(protect, admin, getTeams);
router.route("/match").get(protect, admin, getMatch);

export default router;
