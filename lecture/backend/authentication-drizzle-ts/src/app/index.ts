import express from "express";
import type { Express } from "express";

import { authRouter } from "./auth/routes";
import { authenticationMiddleware } from "./middleware/auth-middleware";

export function createApplication(): Express {
  const app = express();

  app.use(express.json());
  app.use(authenticationMiddleware());

  app.use("/auth", authRouter);

  app.get("/", (req, res) => {
    return res.json({ message: "Welcome to ChaiCode auth service" });
  });

  return app;
}
