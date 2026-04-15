import express from "express";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import pool from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import movieRoutes from "./routes/movie.routes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(publicDir));

app.get("/seats", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM seats ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch seats",
      details: err.message,
    });
  }
});

app.put("/:id/:name", async (req, res) => {
  const { id, name } = req.params;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const seatResult = await client.query(
      "SELECT * FROM seats WHERE id = $1 AND isbooked = 0 FOR UPDATE",
      [id]
    );

    if (seatResult.rowCount === 0) {
      await client.query("ROLLBACK");
      return res.json({ error: "Seat already booked" });
    }

    await client.query(
      "UPDATE seats SET isbooked = 1, name = $2 WHERE id = $1",
      [id, name]
    );

    await client.query("COMMIT");
    return res.json({ success: true, message: "Seat booked successfully." });
  } catch (err) {
    await client.query("ROLLBACK");
    return res.status(500).json({
      error: "Booking failed",
      details: err.message,
    });
  } finally {
    client.release();
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.sendFile(join(publicDir, "index.html"));
});

export default app;
