import db, { getClient } from "../config/db.js";

const normalizeSeatNumber = (seatNumber) =>
  String(seatNumber).trim().toUpperCase();

const bookSeat = async (req, res) => {
  const { movie_id, seat_number } = req.body;
  const userId = req.user.id;

  if (!movie_id || !seat_number) {
    return res.status(400).json({
      success: false,
      message: "movie_id and seat_number are required.",
    });
  }

  const seatNumber = normalizeSeatNumber(seat_number);
  const client = await getClient();

  try {
    await client.query("BEGIN");

    const movieResult = await client.query(
      "SELECT * FROM movies WHERE id = $1 FOR UPDATE",
      [movie_id]
    );

    if (movieResult.rowCount === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({
        success: false,
        message: "Movie not found.",
      });
    }

    const movie = movieResult.rows[0];

    if (movie.available_seats <= 0) {
      await client.query("ROLLBACK");
      return res.status(400).json({
        success: false,
        message: "No seats available for this movie.",
      });
    }

    const existingBooking = await client.query(
      "SELECT id FROM bookings WHERE movie_id = $1 AND seat_number = $2 FOR UPDATE",
      [movie_id, seatNumber]
    );

    if (existingBooking.rowCount > 0) {
      await client.query("ROLLBACK");
      return res.status(409).json({
        success: false,
        message: `Seat ${seatNumber} is already booked.`,
      });
    }

    const bookingResult = await client.query(
      `INSERT INTO bookings (user_id, movie_id, seat_number)
       VALUES ($1, $2, $3)
       RETURNING id, user_id, movie_id, seat_number, booked_at`,
      [userId, movie_id, seatNumber]
    );

    await client.query(
      "UPDATE movies SET available_seats = available_seats - 1 WHERE id = $1",
      [movie_id]
    );

    await client.query("COMMIT");

    return res.status(201).json({
      success: true,
      message: "Seat booked successfully.",
      data: {
        ...bookingResult.rows[0],
        movie_title: movie.title,
      },
    });
  } catch (err) {
    await client.query("ROLLBACK");

    if (err.code === "23505") {
      return res.status(409).json({
        success: false,
        message: `Seat ${seatNumber} is already booked.`,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error.",
      error: err.message,
    });
  } finally {
    client.release();
  }
};

const getMyBookings = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT b.id, b.seat_number, b.booked_at,
              m.id AS movie_id, m.title, m.genre, m.language, m.release_date
       FROM bookings b
       JOIN movies m ON b.movie_id = m.id
       WHERE b.user_id = $1
       ORDER BY b.booked_at DESC`,
      [req.user.id]
    );

    return res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error.",
      error: err.message,
    });
  }
};

const cancelBooking = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const client = await getClient();

  try {
    await client.query("BEGIN");

    const bookingResult = await client.query(
      "SELECT * FROM bookings WHERE id = $1 AND user_id = $2 FOR UPDATE",
      [id, userId]
    );

    if (bookingResult.rowCount === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({
        success: false,
        message: "Booking not found or not yours.",
      });
    }

    const booking = bookingResult.rows[0];

    await client.query("DELETE FROM bookings WHERE id = $1", [id]);
    await client.query(
      "UPDATE movies SET available_seats = available_seats + 1 WHERE id = $1",
      [booking.movie_id]
    );

    await client.query("COMMIT");

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully.",
    });
  } catch (err) {
    await client.query("ROLLBACK");
    return res.status(500).json({
      success: false,
      message: "Server error.",
      error: err.message,
    });
  } finally {
    client.release();
  }
};

export { bookSeat, getMyBookings, cancelBooking };
