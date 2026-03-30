import ApiError from "../../common/utils/api-error.js";
import ApiResponse from "../../common/utils/api-response.js";
import * as authService from "./auth.services.js";
ApiError;

const register = async (req, res) => {
  const user = await authService.register(req.body);
  ApiResponse.created(res, "Registration success", user);
};

const login = async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.login(req.body);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  ApiResponse.ok(res, "Login successful", { user, accessToken, refreshToken });
};

const refreshToken = async (req, res) => {
  const token = req.cookies?.refreshToken;
  const accessToken = await authService.refresh(token);
  ApiResponse.ok(res, "Token refreshed", { accessToken });
};

const logout = async (req, res) => {
  await authService.logout(req.user.id);
  res.clearCookie("refreshToken");
  ApiResponse.ok(res, "Logout success");
};

const verifyEmail = async (req, res) => {
  const token = await authService.verifyEmail(req.params.token);
  ApiResponse.ok(res, "Email Verified", token);
};

const forgotPassword = async (req, res) => {
  await authService.forgotPassword(req.body.email);
  ApiResponse.ok(res, "Password reset email sent");
};

const resetPassword = async (req, res) => {
  await authService.resetPassword(req.params.token, req.body.email);
  ApiResponse.ok(res, "Password reset successful");
};

const getMe = async (req, res) => {
  const user = await authService.getMe(req.user.id);
  ApiResponse.ok(res, "User Profile", user);
};

export {
  register,
  login,
  logout,
  getMe,
  verifyEmail,
  refreshToken,
  forgotPassword,
  resetPassword,
};
