import db from "../config/db.js";

const getAllMovies = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM movies ORDER BY id ASC");
    return res.status(200).json({ success: true, data: result.rows });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error.",
      error: err.message,
    });
  }
};

const getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query("SELECT * FROM movies WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Movie not found.",
      });
    }

    return res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error.",
      error: err.message,
    });
  }
};

const getBookedSeats = async (req, res) => {
  const { id } = req.params;

  try {
    const movieResult = await db.query(
      "SELECT id, title, total_seats, available_seats FROM movies WHERE id = $1",
      [id]
    );

    if (movieResult.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Movie not found.",
      });
    }

    const bookedResult = await db.query(
      "SELECT seat_number FROM bookings WHERE movie_id = $1 ORDER BY seat_number ASC",
      [id]
    );

    return res.status(200).json({
      success: true,
      data: {
        movie: movieResult.rows[0],
        booked_seats: bookedResult.rows.map((row) => row.seat_number),
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error.",
      error: err.message,
    });
  }
};

export { getAllMovies, getMovieById, getBookedSeats };
