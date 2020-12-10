import express from "express";
const router = express.Router();
import {
  getCosplayApplies,
  getCosplayApplyById,
  updateApplyStatus,
  getScoreById,
  addScoreById,
  updateScoreById,
} from "../controllers/cosplayController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

//router.route("/").get(protect, admin, getCosplayApplies);
router.route("/").get(protect, getCosplayApplies);
router
  .route("/:id")
  .get(protect, getCosplayApplyById)
  .put(protect, updateApplyStatus);

// router
//   .route("/:id/score")
//   .get(protect, getScoreById)
//   .post(protect, addScoreById)
//   .put(protect, updateScoreById);

router
  .route("/:id/score")
  .get(getScoreById)
  .post(protect, addScoreById)
  .put(protect, updateScoreById);
export default router;
