import express from "express";
const router = express.Router();
import {
  getCards,
  deleteCard,
} from "../controllers/h55cardController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/list").get(protect, getCards);

router.route("/:id").delete(protect, deleteCard);

export default router;
