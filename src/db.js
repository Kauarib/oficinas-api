import mysql from 'mysql2/promise';
import 'dotenv/config';

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
try {
  const conn = await pool.getConnection();
  const [rows] = await conn.query('SELECT CURRENT_USER() AS currentUser, USER() AS userFunc, VERSION() AS version;');
  console.log(rows[0]);
  conn.release();
} catch (err) {
  console.error('DB connection failed:', err.message);
}
