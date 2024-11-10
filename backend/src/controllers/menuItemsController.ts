import express, { Request, Response } from "express";
import { Category, MenuItem, Restaurant } from "../models";
import { Op, Sequelize } from "sequelize";
import { z } from "zod";
import { asyncHandler, validateRequest } from "../middlewares";

const menuItemsController = express.Router();

const searchMenuItemsSchema = z.object({
  query: z.string().optional(),
  restaurant: z.string().optional(),
  page: z.string().optional(),
  itemsPerPage: z.string().optional(),
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
        const { query, restaurant, page, itemsPerPage } = req.query;

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
          ...(restaurant && { restaurantId: restaurant }),
        };

        const findOptions: any = {
          where: whereClause,
          include: [
            {
              model: Restaurant,
              as: "restaurant",
            },
          ],
          order: [[Sequelize.literal("calories / price"), "DESC"]],
        };

        if (pageNum && itemsPerPageNum) {
          findOptions.offset = (pageNum - 1) * itemsPerPageNum;
          findOptions.limit = itemsPerPageNum;
        }

        const { count, rows: menuItems } = await MenuItem.findAndCountAll(
          findOptions
        );

        if (!menuItems.length) {
          return res.respond(
            true,
            "No menu items found for the given query",
            []
          );
        }

        const totalPages = itemsPerPageNum
          ? Math.ceil(count / itemsPerPageNum)
          : 1;

        res.respond(true, "Menu items retrieved successfully", {
          hits: menuItems,
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
