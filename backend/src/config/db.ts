import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.CLEARDB_DATABASE_URL;

const db = dbUrl
  ? mysql.createConnection(dbUrl)
  : mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT || "3306", 10),
      keepAliveInitialDelay: 10000,
      enableKeepAlive: true
    });

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
  console.log("Connected to the database");
});

export default db;
