import "dotenv/config";
import pg from "pg";

const pool = new pg.Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5433),
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "sql_class_2_db",
  max: Number(process.env.DB_MAX_POOL_SIZE || 20),
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0,
});

export const query = (text, params) => pool.query(text, params);
export const getClient = () => pool.connect();

export default pool;
