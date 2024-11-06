import express, { Request, Response } from "express";
import { Category, MenuItem } from "../models";
import { Op, Sequelize } from "sequelize";
import { z } from "zod";
import { asyncHandler, validateRequest } from "../middlewares";

const menuItemsController = express.Router();

const searchMenuItemsSchema = z.object({
  query: z.string(),
  restaurant: z.string().optional(),
});

menuItemsController.get(
  "/v1/search",
  validateRequest(searchMenuItemsSchema, "query"),
  asyncHandler(
    async (
      req: Request<any, any, any, z.infer<typeof searchMenuItemsSchema>>,
      res: Response
    ) => {
      try {
        const { query, restaurant } = req.query;

        const menuItems = await MenuItem.findAll({
          where: {
            restaurantId: restaurant,
            name: {
              [Op.like]: `%${query}%`,
            },
          },
        });

        if (!menuItems.length) {
          return res.respond(
            true,
            "No menu items found for the given query",
            []
          );
        }

        res.respond(true, "Menu items retrieved successfully", menuItems);
      } catch (error) {
        console.error(error);

        res.respond(false, "Unable to fetch menu items", null, [
          { field: "general", message: "Internal server error" },
        ]);
      }
    }
  )
);

const getTopCPDByRestaurantSchema = z.object({
  restaurantId: z.string().min(1),
});

menuItemsController.get(
  "/v1/get-top-calories-per-dollar-for-each-category-by-restaurant",
  asyncHandler(
    async (
      req: Request<any, any, any, z.infer<typeof getTopCPDByRestaurantSchema>>,
      res: Response
    ) => {
      try {
        const restaurantId = req.query.restaurantId;

        const categories = await Category.findAll({
          where: { restaurantId },
          attributes: ["id", "name"],
        });

        const overallItems = await MenuItem.findAll({
          where: { restaurantId },
          order: [[Sequelize.literal("calories / price"), "DESC"]],
        });

        const categoryItems = await Promise.all(
          categories.map(async (category) => {
            const items = await MenuItem.findAll({
              where: {
                categoryId: category.id,
                restaurantId,
              },
              order: [[Sequelize.literal("calories / price"), "DESC"]],
            });
            return {
              categoryName: category.name,
              categoryId: category.id,
              items,
            };
          })
        );

        const response = [
          { categoryName: "Overall", categoryId: "", items: overallItems },
          ...categoryItems,
        ];

        res.respond(true, "Menu items retrieved successfully", response);
      } catch (error) {
        console.error(error);
        res.respond(false, "Unable to fetch menu items", null, [
          { field: "general", message: "Internal server error" },
        ]);
      }
    }
  )
);

export default menuItemsController;
