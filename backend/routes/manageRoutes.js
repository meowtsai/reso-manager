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
import {
  getResources,
  getResourcebyId,
  createResource,
  updateResource,
  deleteResource,
} from "../controllers/resourceController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/role/list").get(protect, admin, getRoles);
router.route("/role").post(protect, admin, createRole);
router
  .route("/role/id/:id")
  .delete(protect, admin, deleteRole)
  .get(protect, admin, getRolebyId)
  .put(protect, admin, updateRole);

router.route("/resource/list").get(protect, admin, getResources);
router.route("/resource").post(protect, admin, createResource);

router
  .route("/resource/:id")
  .delete(protect, admin, deleteResource)
  .get(protect, admin, getResourcebyId)
  .put(protect, admin, updateResource);

export default router;
