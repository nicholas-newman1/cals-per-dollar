import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.CLEARDB_DATABASE_URL;

const db = knex({
  client: "mysql2",
  connection: dbUrl || {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || "3306", 10),
    decimalNumbers: true,
  },
  pool: { min: 2, max: 10 },
});

db.raw("SELECT 1")
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  });

export default db;
