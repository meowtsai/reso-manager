import express from "express";
const router = express.Router();
import { getKols } from "../controllers/kolController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(protect, admin, getKols);

export default router;
