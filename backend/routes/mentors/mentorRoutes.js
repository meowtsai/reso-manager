import express from "express";
const router = express.Router();
import { protect, admin } from "../../middleware/authMiddleware.js";
import {
  getMentors,
  getMentorById,
  updateMentor,
} from "../../controllers/mentors/mentorController.js";
//import { protect, admin } from "../../middleware/authMiddleware";

//router.route("/games").get(protect, admin, getGames);
router.route("/").get(getMentors);

router
  .route("/:id")
  .get(protect, admin, getMentorById)
  .put(protect, admin, updateMentor);

export default router;
