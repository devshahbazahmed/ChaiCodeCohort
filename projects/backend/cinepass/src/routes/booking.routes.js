import express from "express";
import {
  bookSeat,
  getMyBookings,
  cancelBooking,
} from "../controllers/booking.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", bookSeat);
router.get("/my", getMyBookings);
router.delete("/:id", cancelBooking);

export default router;
