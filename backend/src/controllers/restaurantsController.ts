import { Request, Response } from "express";
import * as RestaurantsDao from "../daos/restaurantsDao";
import { GetByIdSchema } from "../schemas/common/getByIdSchema";

export const getRestaurantById = async (
  req: Request<any, any, any, GetByIdSchema>,
  res: Response
) => {
  try {
    const { id } = req.query;
    const restaurant = await RestaurantsDao.getRestaurantById(id);

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
};

export const getAllRestaurants = async (_: Request, res: Response) => {
  try {
    const restaurants = await RestaurantsDao.getAllRestaurants();

    res.respond(true, "Restaurants retrieved successfully", restaurants);
  } catch (error) {
    console.error(error);

    res.respond(false, "Unable to fetch restaurants", null, [
      { field: "general", message: "Internal server error" },
    ]);
  }
};
