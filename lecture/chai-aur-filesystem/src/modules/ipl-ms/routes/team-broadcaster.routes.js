import { Router } from "express";
import * as controller from "../controllers/team-broadcaster.controller.js";

const router = Router();

router.post("/assign", controller.assignBroadcaster);

router.delete("/unassign", controller.unassignBroadcaster);

export default router;
