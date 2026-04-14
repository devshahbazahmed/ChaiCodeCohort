import cookieParser from "cookie-parser";
import express from "express";
import authRoute from "./modules/auth/auth.routes.js";
import ApiError from "./common/utils/api-error.js";
import ownerRoutes from "./modules/ipl-ms/routes/owner.routes.js";
import teamRoutes from "./modules/ipl-ms/routes/team.routes.js";
import sponsorRoutes from "./modules/ipl-ms/routes/sponsor.routes.js";
import broadcasterRoutes from "./modules/ipl-ms/routes/broadcaster.routes.js";
// import multer from "multer";
// import ApiResponse from "./common/utils/api-response.js";
// import path from "node:path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname);
//     cb(null, file.fieldname + "-" + uniqueSuffix + ext);
//   },
// });

// const storage = multer.memoryStorage();

// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 1024 * 1024 * 2, // 2MB
//   },
//   fileFilter: (req, file, cb) => {
//     const allowed = ["image/png", "image/jpeg", "application/pdf"];

//     if (allowed.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new ApiError("File not supported"), false);
//     }
//   },
// });

// app.post("/upload", (req, res, next) => {
//   upload.single("file")(req, res, (err) => {
//     if (err?.code === "LIMIT_FILE_SIZE") {
//       return res.send("File too large");
//     }
//     res.send("Upload");
//     next();
//   });
// });

// For Single file
// app.post("/upload", upload.single("file"), (req, res) => {
//   console.log(req.file);
//   console.log(req.file.buffer);
//   // Saving in memory or database
//   const newImage = new ImageModel({
//     data: req.file.buffer,
//     contentType: req.file.mimetype,
//   });

//   newImage.save();

//   ApiResponse.ok(res);
// });

// For multiple files with same fields
// app.post("/upload", upload.array("photos"), (req, res) => {
//   console.log(req.files);

//   ApiResponse.ok(res);
// });

// For multiple files with different fields
// app.post(
//   "/upload",
//   upload.fields([
//     {
//       name: "avatar",
//       maxCount: 1,
//     },
//   ]),
//   (req, res) => {
//     console.log(req.files);

//     ApiResponse.ok(res);
//   }
// );

app.use("/api/auth", authRoute);
app.use("/api/owners", ownerRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/sponsors", sponsorRoutes);
app.use("/api/broadcasters", broadcasterRoutes);

// Catch-all for undefined routes
app.all("{*path}", (req, res) => {
  throw ApiError.notFound(`Route ${req.originalUrl} not found`);
});
export default app;
