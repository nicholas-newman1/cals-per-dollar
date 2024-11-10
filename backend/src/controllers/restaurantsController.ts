import { Request, Response, Router } from "express";
import getByIdSchema, { GetByIdSchema } from "../schemas/common/getByIdSchema";
import { Restaurant } from "../models";
import { asyncHandler, validateRequest } from "../middlewares";
import { Op } from "sequelize";

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

restaurantsController.get(
  "/v1/search",
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const { query, page, itemsPerPage } = req.query;

      const pageNum = page ? parseInt(page as string, 10) : undefined;
      const itemsPerPageNum = itemsPerPage
        ? parseInt(itemsPerPage as string, 10)
        : undefined;

      if (
        (pageNum && isNaN(pageNum)) ||
        (itemsPerPageNum && isNaN(itemsPerPageNum))
      ) {
        return res.respond(false, "Invalid pagination parameters", null, [
          {
            field: "pagination",
            message: "Page and itemsPerPage must be valid numbers",
          },
        ]);
      }

      const whereClause = {
        ...(query && { name: { [Op.like]: `%${query}%` } }),
      };

      const findOptions: any = {
        where: whereClause,
      };

      if (pageNum && itemsPerPageNum) {
        findOptions.offset = (pageNum - 1) * itemsPerPageNum;
        findOptions.limit = itemsPerPageNum;
      }

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

      const totalPages = itemsPerPageNum
        ? Math.ceil(count / itemsPerPageNum)
        : 1;

      res.respond(true, "Restaurants retrieved successfully", {
        hits: restaurants,
        pagination: itemsPerPageNum
          ? {
              currentPage: pageNum,
              totalPages,
              totalItems: count,
              itemsPerPage: itemsPerPageNum,
            }
          : undefined,
      });
    } catch (error) {
      console.error(error);

      res.respond(false, "Unable to fetch restaurants", null, [
        { field: "general", message: "Internal server error" },
      ]);
    }
  })
);
export default restaurantsController;
