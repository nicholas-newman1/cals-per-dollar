import { Router } from "express";
import {
  searchMenuItems,
  getTopCaloriesPerDollarForEachCategoryByRestaurant,
} from "../controllers/menuItemsController";
import { validateRequest } from "../utils/validationUtil";
import searchMenuItemsSchema from "../schemas/menuItems/searchMenuItemsSchema";

const router: Router = Router();
router.get(
  "/v1/search",
  validateRequest(searchMenuItemsSchema, "query"),
  searchMenuItems
);
router.get(
  "/v1/get-top-calories-per-dollar-for-each-category-by-restaurant",
  getTopCaloriesPerDollarForEachCategoryByRestaurant
);

export default router;
