require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    migrationStorageTableName: "cpd_sequelize_migrations",
  },
  production: {
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql",
    migrationStorageTableName: "cpd_sequelize_migrations",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
