import { todo } from "node:test";
import { todoSchema, type Todo } from "../../validation/todo.schema.js";
import type { Request, Response } from "express";

class TodoController {
  private _db: Todo[];

  constructor() {
    this._db = [];
  }

  public handleGetAllTodos(req: Request, res: Response) {
    const todos = this._db;
    return res.json({ todos });
  }

  public async insertTodo(req: Request, res: Response) {
    try {
      const unvalidatedBody = req.body;
      const validationResult = await todoSchema.parseAsync(unvalidatedBody);
      this._db.push(validationResult);
      res.status(201).json({ todo: validationResult });
    } catch (error) {
      res.status(500).json({ error: "Validation Failed" });
    }
  }
}

export default TodoController;
