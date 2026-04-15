import express from "express";
import {
  getAllMovies,
  getBookedSeats,
  getMovieById,
} from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/", getAllMovies);
router.get("/:id", getMovieById);
router.get("/:id/seats", getBookedSeats);

export default router;
