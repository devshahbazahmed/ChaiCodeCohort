import express from "express";
import type { Application } from "express";
import todoRouter from "./todo/routes.js";

// Routes

export function createServerApplication(): Application {
  const app = express();

  app.use(express.json());

  app.use("/todos", todoRouter);

  // //#region //*=========== Routes ==============="
  // app.get("/", (req, res) => {
  //   return res.json({
  //     message: "Hello how are you",
  //   });
  // });

  // app.get("/", (req, res) => {
  //   return res.json({
  //     message: "Bye",
  //   });
  // });
  // //#endregion //*=========== Routes ==============="

  return app;
}
