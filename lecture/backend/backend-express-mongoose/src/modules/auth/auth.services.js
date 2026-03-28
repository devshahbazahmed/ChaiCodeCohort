import { sendVerificationEmail } from "../../common/config/email.js";
import ApiError from "../../common/utils/api-error.js";
import {
  generateAccessToken,
  generateRefreshToken,
  generateResetToken,
  verifyRefreshToken,
} from "../../common/utils/jwt.utils.js";
import User from "./auth.model.js";

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

const register = async ({ name, email, password, role }) => {
  // do user registraion
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError.conflict("Email already exists");
  }

  const { rawToken, hashedToken } = generateResetToken();

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken: hashedToken,
  });

  // TODO: send an email to user with token: rawtoken
  try {
    await sendVerificationEmail(email, token);
  } catch (error) {
    console.error(error);
  }

  const userObj = user.toObject();
  delete user.password;
  delete user.verificationToken;

  // return user
  return userObj;
};

const login = async ({ email, password }) => {
  // take email and find user in DB
  // check if password is correct
  // check if verified or not

  const user = await User.findOne({ email }).select("+password");

  if (!user) throw ApiError.unAuthorized("Invalid email or password");

  // somehow check the password
  const isMatch = await user.comparePassword(password);

  if (!isMatch) throw ApiError.unAuthorized("Invalid email or password");

  if (!user.isVerified) {
    throw ApiError.forbidden("Please evrify your email vefore login");
  }

  const accessToken = generateAccessToken({ id: user._id, user: user.role });
  const refreshToken = generateRefreshToken({ id: user._id });

  user.refreshToken = hashToken(refreshToken);
  await user.save({ validateBeforeSave: false });

  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.refreshToken;

  return { user: userObj, accessToken, refreshToken };
};

const refresh = async (token) => {
  if (!token) throw ApiError.unAuthorized("Refresh token missing");

  const decoded = verifyRefreshToken(token);

  const user = await User.findById(decoded.id).select("+refreshToken");

  if (!user) throw ApiError.unAuthorized("User not found");

  if (user.refreshToken !== hashToken(token)) {
    throw ApiError.unAuthorized("Invalid refresh token");
  }

  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id });

  user.refreshToken = hashToken(refreshToken);
  await user.save({ validateBeforeSave: false });

  const userObj = user.toObject();
  delete user.password;
  delete user.refreshToken;

  return { user: userObj, accessToken, refreshToken };
};

const logout = async (userId) => {
  // const user = await User.findById(userId);
  // if (!user) throw ApiError.unAuthorized("User not found");

  // user.refreshToken = undefined;
  // await user.save({ validateBeforeSave: false });

  await User.findByIdAndUpdate(userId, { refreshToken: null });
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw ApiError.notfound("No account with that email");
  const { rawToken, hashedToken } = generateResetToken();
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

  await user.save();

  // TODO: send email
};

const newPassword = async ({ token, password }) => {
  if (!token) throw ApiError.unAuthorized("Refresh token missing");
  const decoded = verifyRefreshToken(token);
  const user = await User.findById(decoded.id).select("+refreshToken");
  if (!user) throw ApiError.notfound("User not found");
  if (user.refreshToken !== hashToken(token)) {
    throw ApiError.unAuthorized("Invalid refresh token");
  }
  await User.findByIdAndUpdate(user.id, { password: password });
};

const verifyEmail = async (token) => {
  const hashedToken = hashToken(token);
  const user = await User.findOne({ verificationToken: hashedToken }).select(
    "+verificationToken"
  );
  if (!user) throw ApiError.notfound("User not found");

  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();
  return user;
};

const getMe = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw ApiError.notfound("User not found");
  return user;
};

export {
  register,
  login,
  refresh,
  logout,
  forgotPassword,
  newPassword,
  getMe,
  verifyEmail,
};
