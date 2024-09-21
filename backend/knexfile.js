require("dotenv").config();

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
  },
  production: {
    client: "mysql2",
    connection: process.env.CLEARDB_DATABASE_URL, // Use Heroku's env variable
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
  },
};
