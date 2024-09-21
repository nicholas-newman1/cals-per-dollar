import express, { Request, Response, NextFunction } from "express";
import menuItemsRoutes from "./routes/menuItemsRoutes";
import restaurantsRoutes from "./routes/restaurantsRoutes";
import { createResponse, ValidationError } from "./utils/responseUtil";
import errorHandler from "./middlewares/errorHandler";
import scrapeMcDonaldsMenu from "./services/scrapeMcDonaldsMenu";
import scrapeWendysMenu from "./services/scrapeWendysMenu";

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
    scrapeWendysMenu();
    scrapeMcDonaldsMenu();
    res.send("Scraping menus...");
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.use(errorHandler);

export default app;
