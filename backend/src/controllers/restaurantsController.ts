import { Request, Response, Router } from "express";
import getByIdSchema, { GetByIdSchema } from "../schemas/common/getByIdSchema";
import { Restaurant } from "../models";
import { asyncHandler, validateRequest } from "../middlewares";
import { z } from "zod";
import baseSearchSchema from "../schemas/common/baseSearchSchema";
import createFindOptions from "../utils/createFindOptions";
import createPagination from "../utils/createPagination";

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

const searchRestaurantsSchema = baseSearchSchema;

restaurantsController.get(
  "/v1/search",
  validateRequest(searchRestaurantsSchema, "query"),
  asyncHandler(
    async (
      req: Request<any, any, any, z.infer<typeof searchRestaurantsSchema>>,
      res: Response
    ) => {
      try {
        const { query, page, itemsPerPage } = req.query;
        const { findOptions, pageNum, itemsPerPageNum } = createFindOptions(
          query,
          page,
          itemsPerPage
        );

        const { count, rows: restaurants } = await Restaurant.findAndCountAll(
          findOptions
        );

        if (!restaurants.length) {
          return res.respond(
            true,
            "No restaurants found for the given query",
            []
          );
        }

        const pagination = createPagination(count, pageNum, itemsPerPageNum);

        res.respond(true, "Restaurants retrieved successfully", {
          hits: restaurants,
          pagination,
        });
      } catch (error) {
        console.error(error);
        res.respond(false, "Unable to fetch restaurants", null, [
          { field: "general", message: "Internal server error" },
        ]);
      }
    }
  )
);
export default restaurantsController;
