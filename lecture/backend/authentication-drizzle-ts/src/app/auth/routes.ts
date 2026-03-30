import express from "express";
import type { Router } from "express";
import AuthenticationController from "./controller";
import { restrictToAuthenticatedUser } from "../middleware/auth-middleware";

const authenticationController = new AuthenticationController();

export const authRouter: Router = express.Router();

authRouter.post(
  "/signup",
  authenticationController.handleSignup.bind(authenticationController)
);

authRouter.post(
  "/signin",
  authenticationController.handleSignin.bind(authenticationController)
);

authRouter.get(
  "/me",
  restrictToAuthenticatedUser(),
  authenticationController.handleMe.bind(authenticationController)
);
