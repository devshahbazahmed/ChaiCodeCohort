import { Router } from "express";
import * as controller from "../controllers/players.controller.js";

const router = Router();

router.post("/", controller.createPlayer);

router.get("/", controller.getAllPlayers);

router.get("/:id", controller.getPlayerById);

router.put("/:id", controller.updatePlayer);

router.delete("/:id", controller.deletePlayer);

router.put("/:id", controller.transferPlayer);

router.get("/:teamId", controller.getPlayersByTeam);

router.put("/:id", controller.updatePlayerRole);

export default router;
