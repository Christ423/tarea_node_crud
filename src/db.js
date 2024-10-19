import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "root",
  port: "8099",
  user: "root",
  password: "", // Coloca tu contraseña de MySQL
  database: "escuela",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
