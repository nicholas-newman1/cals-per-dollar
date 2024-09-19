import { Router } from "express";
import {
  searchItems,
  getTopCaloriesPerDollarForEachCategoryByRestaurant,
} from "../controllers/menuItemsController";

const router: Router = Router();
router.get("/v1/search", searchItems);
router.get(
  "/v1/get-top-calories-per-dollar-for-each-category-by-restaurant",
  getTopCaloriesPerDollarForEachCategoryByRestaurant
);

export default router;
