import { Options, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.JAWSDB_URL;

const options: Options = {
  host: dbUrl ? undefined : process.env.DB_HOST || "",
  port: dbUrl ? undefined : parseInt(process.env.DB_PORT || "3306", 10),
  dialect: "mysql",
  dialectOptions: { decimalNumbers: true },
  pool: { max: 10, min: 2, acquire: 30000, idle: 10000 },
};

const sequelize = dbUrl
  ? new Sequelize(dbUrl, options)
  : new Sequelize(
      process.env.DB_NAME!,
      process.env.DB_USER!,
      process.env.DB_PASSWORD,
      options
    );

sequelize.addHook("beforeFind", (options) => {
  options.nest = true;
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err: Error) => {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  });

export default sequelize;
