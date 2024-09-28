import { Request, Response } from "express";
import * as MenuItemDao from "../daos/menuItemDao";
import * as CategoryDao from "../daos/categoryDao";
import { SearchMenuItemsSchema } from "../schemas/menuItems/searchMenuItemsSchema";
import { GetTopCPDByRestaurantSchema } from "../schemas/menuItems/getTopCPDByRestaurantSchema";

export const searchMenuItems = async (
  req: Request<any, any, any, SearchMenuItemsSchema>,
  res: Response
) => {
  try {
    const { query, restaurant } = req.query;

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
  req: Request<any, any, any, GetTopCPDByRestaurantSchema>,
  res: Response
) => {
  try {
    const restaurantId = req.query.restaurantId;
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
