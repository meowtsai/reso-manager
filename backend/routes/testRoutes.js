import express from "express";
const router = express.Router();
import { getPermissionsByRoleId } from "../controllers/permissionController.js";
//import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/:id").get(getPermissionsByRoleId);

export default router;
