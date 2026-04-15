CREATE TABLE IF NOT EXISTS seats (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  isbooked INT DEFAULT 0
);

INSERT INTO seats (id, isbooked)
SELECT gs, 0
FROM generate_series(1, 20) AS gs
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  genre VARCHAR(100),
  language VARCHAR(50),
  duration_mins INT,
  release_date DATE,
  total_seats INT DEFAULT 100,
  available_seats INT DEFAULT 100
);

CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  movie_id INT NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
  seat_number VARCHAR(10) NOT NULL,
  booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_seat_per_movie UNIQUE (movie_id, seat_number)
);

INSERT INTO movies (
  title,
  genre,
  language,
  duration_mins,
  release_date,
  total_seats,
  available_seats
)
VALUES
  ('Interstellar', 'Sci-Fi', 'English', 169, '2024-01-15', 100, 100),
  ('KGF Chapter 3', 'Action', 'Kannada', 180, '2024-03-20', 150, 150),
  ('Dune Part Two', 'Sci-Fi', 'English', 166, '2024-02-10', 120, 120),
  ('Animal', 'Action', 'Hindi', 204, '2024-01-05', 100, 100),
  ('Pushpa 2', 'Action', 'Telugu', 190, '2024-04-01', 200, 200)
ON CONFLICT DO NOTHING;
