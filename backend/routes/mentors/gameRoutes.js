import express from "express";
const router = express.Router();

import { getGames } from "../../controllers/mentors/gameController.js";
//import { protect, admin } from "../../middleware/authMiddleware";

//router.route("/games").get(protect, admin, getGames);
router.route("/games").get(getGames);

export default router;
