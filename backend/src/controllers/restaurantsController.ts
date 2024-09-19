import { Request, Response } from "express";
import * as RestaurantsDao from "../daos/restaurantsDao";

export const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const id = req.query.id;

    if (typeof id !== "string") {
      return res.respond(false, "Restaurant ID is required", null, [
        { field: "id", message: "Restaurant ID is required" },
      ]);
    }

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
