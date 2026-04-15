# CinePass

A simplified movie ticket booking backend built by extending the Chai Aur SQL starter flow instead of replacing it.

## What this includes

- User registration and login with hashed passwords
- JWT-based auth middleware
- Protected booking endpoints
- Duplicate seat booking prevention
- Bookings tied to the logged-in user
- Mock movie data
- Legacy starter endpoints preserved:
  - `GET /seats`
  - `PUT /:id/:name`

## Tech stack

- Node.js
- Express
- PostgreSQL
- `pg`
- `bcryptjs`
- `jsonwebtoken`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create your env file:

```bash
cp .env.example .env
```

3. Update `.env` if your local Postgres config is different.

4. Run the schema:

```bash
psql -h localhost -p 5433 -U postgres -d sql_class_2_db -f src/sql/schema.sql
```

5. Start the server:

```bash
npm run dev
```

The app will run on `http://localhost:8080` unless `PORT` is changed.

## Environment variables

```env
PORT=8080
DB_HOST=localhost
DB_PORT=5433
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=sql_class_2_db
DB_MAX_POOL_SIZE=20
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
```

## API flow

### Public auth routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` requires token

Register body:

```json
{
  "name": "Rohan Sharma",
  "email": "rohan@example.com",
  "password": "secret123"
}
```

Login body:

```json
{
  "email": "rohan@example.com",
  "password": "secret123"
}
```

### Public movie routes

- `GET /api/movies`
- `GET /api/movies/:id`
- `GET /api/movies/:id/seats`

### Protected booking routes

Send `Authorization: Bearer <token>`.

- `POST /api/bookings`
- `GET /api/bookings/my`
- `DELETE /api/bookings/:id`

Book seat body:

```json
{
  "movie_id": 1,
  "seat_number": "A5"
}
```

## Notes

- Booking uses a transaction plus a unique database constraint to prevent duplicate seat reservations.
- `user_id` is always taken from the JWT payload, not from request input.
- The original starter endpoints still work for backward compatibility.
