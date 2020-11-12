import express from "express";
const router = express.Router();
import {
  getCosplayApplies,
  getCosplayApplyById,
} from "../controllers/cosplayController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

//router.route("/").get(protect, admin, getCosplayApplies);
router.route("/").get(getCosplayApplies);
router.route("/:id").get(getCosplayApplyById);

export default router;
