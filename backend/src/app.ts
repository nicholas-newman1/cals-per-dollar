import "./globalTypes";
import express from "express";
import path from "path";
import cron from "node-cron";
import databaseBackup from "./scripts/databaseBackup";
import menuItemsController from "./controllers/menuItemsController";
import restaurantsController from "./controllers/restaurantsController";
import { errorHandler, resRespond } from "./middlewares";

const app = express();

app.use(resRespond);
app.use(express.json());
app.use("/api/menu-items", menuItemsController);
app.use("/api/restaurants", restaurantsController);
cron.schedule("0 0 * * *", () => databaseBackup());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../../frontend/build")));

// Handle any requests that don't match the API routes by serving the React app
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/build", "index.html"));
});

app.use(errorHandler);

export default app;
