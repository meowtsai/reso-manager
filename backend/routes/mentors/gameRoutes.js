import express from "express";
const router = express.Router();

import { getGames } from "../../controllers/mentors/gameController.js";
import {
  getRegisters,
  updateRegister,
} from "../../controllers/mentors/registerController.js";
//import { protect, admin } from "../../middleware/authMiddleware";

//router.route("/games").get(protect, admin, getGames);
router.route("/games").get(getGames);
router.route("/registers").get(getRegisters);
router.route("/register/:id").post(updateRegister);

export default router;
