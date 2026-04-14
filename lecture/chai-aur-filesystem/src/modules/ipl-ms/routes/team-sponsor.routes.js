import { Router } from "express";
import * as controller from "../controllers/team-sponsor.controller.js";

const router = Router();

router.post("/attach", controller.attachSponsor);

router.delete("/detach", controller.detachSponsor);

export default router;
