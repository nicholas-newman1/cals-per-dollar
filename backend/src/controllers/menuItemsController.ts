import { Request, Response } from "express";
import * as MenuItemDao from "../daos/menuItemDao";
import * as CategoryDao from "../daos/categoryDao";

export const searchItems = async (req: Request, res: Response) => {
  try {
    const { query, restaurant } = req.query;

    if (typeof query !== "string") {
      return res.respond(false, "Search query is required", null, [
        { field: "query", message: "Search query must be a string" },
      ]);
    }

    if (restaurant && typeof restaurant !== "string") {
      return res.respond(false, "Restaurant ID must be a string", null, [
        { field: "restaurant", message: "Restaurant ID must be a string" },
      ]);
    }

    const menuItems = await MenuItemDao.searchMenuItems(query, restaurant);

    console.log(menuItems);

    if (!menuItems.length) {
      return res.respond(true, "No menu items found for the given query", []);
    }

    res.respond(true, "Menu items retrieved successfully", menuItems);
  } catch (error) {
    console.error(error);

    res.respond(false, "Unable to fetch menu items", null, [
      { field: "general", message: "Internal server error" },
    ]);
  }
};

export const getTopCaloriesPerDollarForEachCategoryByRestaurant = async (
  req: Request,
  res: Response
) => {
  try {
    const restaurantId = req.query.restaurantId;

    if (typeof restaurantId !== "string") {
      return res.respond(false, "Restaurant ID is required", null, [
        { field: "restaurantId", message: "Restaurant ID must be a string" },
      ]);
    }

    const categories = await CategoryDao.getCategoriesByRestaurant(
      restaurantId
    );

    const data = await MenuItemDao.getTopCaloriesPerDollarForEachCategory(
      categories.map((category) => category.id.toString()),
      restaurantId
    );

    const response = data.map((category) => ({
      categoryName: categories.find((c) => c.id === +category.categoryId)?.name,
      ...category,
    }));

    res.respond(true, "Menu items retrieved successfully", response);
  } catch (error) {
    console.error(error);

    res.respond(false, "Unable to fetch menu items", null, [
      { field: "general", message: "Internal server error" },
    ]);
  }
};
