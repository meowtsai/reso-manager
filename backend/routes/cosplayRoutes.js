import express from "express";
const router = express.Router();
import {
  getCosplayApplies,
  getCosplayApplyById,
  updateApplyStatus,
} from "../controllers/cosplayController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

//router.route("/").get(protect, admin, getCosplayApplies);
router.route("/").get(getCosplayApplies);
router
  .route("/:id")
  .get(protect, getCosplayApplyById)
  .put(protect, updateApplyStatus);

export default router;
