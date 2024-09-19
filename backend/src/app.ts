import express, { Request, Response, NextFunction } from "express";
import menuItemsRoutes from "./routes/menuItemsRoutes";
import restaurantsRoutes from "./routes/restaurantsRoutes";
import { createResponse, ValidationError } from "./utils/responseUtil";
import errorHandler from "./middlewares/errorHandler";
// import scrapeMcDonaldsMenu from "./services/scrapeMcDonaldsMenu";
// import scrapeWendysMenu from "./services/scrapeWendysMenu";

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
// app.use("/scrape", (_, res) => {
//   scrapeWendysMenu();
//   scrapeMcDonaldsMenu();
//   res.send("Scraping menus...");
// });

app.use(errorHandler);

export default app;
