import express from "express";
import type { Express } from "express";

import { authRouter } from "./auth/routes";

export function createApplication(): Express {
  const app = express();

  app.use(express.json());

  app.use("/auth", authRouter);

  app.get("/", (req, res) => {
    return res.json({ message: "Welcome to ChaiCode auth service" });
  });

  return app;
}
