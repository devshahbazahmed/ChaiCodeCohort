import { Router } from "express";
import * as authController from "./auth.controller.js";
import validate from "../../common/middleware/validate.middleware.js";
import RegisterDto from "./dto/register.dto.js";
import LoginDto from "./dto/login.dto.js";
import ForgotPasswordDto from "./dto/forgotPassword.dto.js";
import ResetPasswordDto from "./dto/reset-password.dto.js";
import { authenticate } from "./auth.middleware.js";

const router = Router();

router.post("/register", validate(RegisterDto), authController.register);
router.post("/login", validate(LoginDto), authController.login);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authenticate, authController.logout);
router.get("/verify-email/:token", authController.verifyEmail);
router.post(
  "/forgot-password/:token",
  validate(ForgotPasswordDto),
  authController.forgotPassword
);
router.put(
  "/reset-password/:token",
  validate(ResetPasswordDto),
  authController.resetPassword
);
router.get("/me", authenticate, authController.getMe);

export default router;
