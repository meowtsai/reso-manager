//群組設定 role

import express from "express";
const router = express.Router();
import {
  getRoles,
  getRolebyId,
  createRole,
  updateRole,
  deleteRole,
} from "../controllers/roleController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/role/list").get(protect, admin, getRoles);
router.route("/role").post(protect, admin, createRole);
router
  .route("/role/id/:id")
  .delete(protect, admin, deleteRole)
  .get(protect, admin, getRolebyId)
  .put(protect, admin, updateRole);

export default router;
