CREATE TABLE ipl_players (
  player_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  team VARCHAR(50),
  role VARCHAR(50),
  runs_scored INT CHECK(runs_scored > 0),
  wickets_taken INT CHECK(wickets_taken > 0),
  auction_price_crores INT,
)

ALTER TABLE ipl_players
ADD COLUMN nickname VARCHAR(50);

SELECT * FROM ipl_players;

SELECT name, nickname, team from ipl_players;

-- ! Filtering

SELECT * FROM ipl_players WHERE team = 'Mumbai Indians';

SELECT name, nickname, auction_price_crores FROM ipl_players WHERE auction_price_crores > 10;

-- ! LOGICAL OPERATORS (AND, OR)

SELECT * FROM ipl_players WHERE wickets_taken > 10 AND role = 'All-rounder';

SELECT * FROM ipl_players WHERE team = 'CSK' OR team = 'RCB';

-- ! PATTERN MATCHING

SELECT * FROM ipl_players WHERE name LIKE '__s%';

SELECT * FROM ipl_players WHERE team IN ('Mumbai Indians', 'KKR', 'CSK', 'RCB');

SELECT * FROM ipl_players WHERE auction_price_crores BETWEEN 10 AND 15;

SELECT * FROM ipl_players WHERE team <> 'RCB';

-- ! SORTING

SELECT name, nickname, auction_price_crores
FROM ipl_players
ORDER BY auction_price_crores DESC;

SELECT name, nickname, auction_price_crores
FROM ipl_players
ORDER BY team ASC, auction_price_crores DESC;

-- ! PAGINATION

SELECT name, nickname, autction_price_crores
FROM ipl_players
ORDER BY auction_price_crores DESC
LIMIT 3;

SELECT name, nickname, autction_price_crores
FROM ipl_players
ORDER BY auction_price_crores DESC
LIMIT 3 OFFSET 0;

SELECT name, nickname, autction_price_crores
FROM ipl_players
ORDER BY auction_price_crores DESC
LIMIT 15 OFFSET 30;

SELECT name, nickname, autction_price_crores
FROM ipl_players
ORDER BY auction_price_crores DESC
LIMIT 15 OFFSET (page - 1) * LIMIT;

-- ! MODIFYING DATA IN RUNTIME

SELECT name, nickname, autction_price_crores, (autction_price_crores * 100) AS price_in_lakhs
FROM ipl_players;

SELECT name, nickname, autction_price_crores, (autction_price_crores + 2) AS new_price
FROM ipl_players;

-- ! HOW YOU CAN GET DISTINCT VALUES

SELECT distinct role FROM ipl_players;

-- ! DQL - Data Query Language



