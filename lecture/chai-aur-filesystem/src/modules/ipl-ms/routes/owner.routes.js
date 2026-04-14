import { Router } from "express";
import * as controller from "../controllers/owner.controller.js";

const router = Router();

// Create a new owner
router.post("/", controller.createOwner);

// Get all owners
router.get("/", controller.getAllOwners);

// Get owner by ID
router.get("/:id", controller.getOwnerById);

// Update owner
router.put("/:id", controller.updateOwner);

// Delete owner
router.delete("/:id", controller.deleteOwner);

export default router;
