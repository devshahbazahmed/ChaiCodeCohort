import { Router } from "express";
import TodoController from "./controllers.js";

const router = Router();
const controller = new TodoController();

router.get("/", controller.handleGetAllTodos.bind(controller));
// router.get("/:id");

router.post("/", controller.insertTodo.bind(controller));

// router.put("/:id");
// router.delete("/:id");

export default router;
