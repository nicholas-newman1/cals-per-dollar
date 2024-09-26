import express, { Request, Response, NextFunction } from "express";
import path from "path";
import menuItemsRoutes from "./routes/menuItemsRoutes";
import restaurantsRoutes from "./routes/restaurantsRoutes";
import { createResponse, ValidationError } from "./utils/responseUtil";
import errorHandler from "./middlewares/errorHandler";
import scrapeMcDonaldsMenu from "./services/scrapeMcDonaldsMenu";
import scrapeWendysMenu from "./services/scrapeWendysMenu";
import scrapeBurgerKingMenu from "./services/scrapeBurgerKingMenu";
import RestaurantEnum from "./types/restaurantEnum";
import scrapeTacoBellMenu from "./services/scrapeTacoBellMenu";

const app = express();

app.use((_req: Request, res: Response, next: NextFunction) => {
  res.respond = function <T>(
    success: boolean,
    message: string,
    data: T | null = null,
    errors: ValidationError[] = []
  ) {
    this.json(createResponse(success, message, data, errors));
  };
  next();
});

app.use(express.json());

app.use("/api/menu-items", menuItemsRoutes);
app.use("/api/restaurants", restaurantsRoutes);
app.use("/scrape", (req, res) => {
  const apiKey = req.headers["authorization"];
  const validApiKey = process.env.ADMIN_API_KEY;
  if (apiKey === `Bearer ${validApiKey}`) {
    const ids = req.body.restaurantIds;
    ids?.includes(RestaurantEnum.MCDONALDS) && scrapeMcDonaldsMenu();
    ids?.includes(RestaurantEnum.WENDYS) && scrapeWendysMenu();
    ids?.includes(RestaurantEnum.BURGER_KING) && scrapeBurgerKingMenu();
    ids?.includes(RestaurantEnum.TACO_BELL) && scrapeTacoBellMenu();
    res.respond(true, "Scraping initiated");
  } else {
    res.respond(false, "Unauthorized", null, [
      {
        field: "apiKey",
        message: "Invalid API key",
      },
    ]);
  }
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../../frontend/build")));

// Handle any requests that don't match the API routes by serving the React app
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/build", "index.html"));
});

app.use(errorHandler);

export default app;
