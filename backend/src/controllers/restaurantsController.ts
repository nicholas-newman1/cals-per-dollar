import { Request, Response, Router } from "express";
import getByIdSchema, { GetByIdSchema } from "../schemas/common/getByIdSchema";
import { Restaurant } from "../models";
import { asyncHandler, validateRequest } from "../middlewares";

const restaurantsController = Router();

restaurantsController.get(
  "/v1/get-by-id",
  validateRequest(getByIdSchema, "query"),
  asyncHandler(
    async (req: Request<any, any, any, GetByIdSchema>, res: Response) => {
      try {
        const { id } = req.query;

        const restaurant = await Restaurant.findByPk(id);

        if (!restaurant) {
          return res.respond(true, "No restaurant found for the given ID", []);
        }

        res.respond(true, "Restaurant retrieved successfully", restaurant);
      } catch (error) {
        console.error(error);

        res.respond(false, "Unable to fetch restaurant", null, [
          { field: "general", message: "Internal server error" },
        ]);
      }
    }
  )
);

restaurantsController.get(
  "/v1/get-all",
  asyncHandler(async (_: Request, res: Response) => {
    try {
      const restaurants = await Restaurant.findAll();

      res.respond(true, "Restaurants retrieved successfully", restaurants);
    } catch (error) {
      console.error(error);

      res.respond(false, "Unable to fetch restaurants", null, [
        { field: "general", message: "Internal server error" },
      ]);
    }
  })
);

export default restaurantsController;
