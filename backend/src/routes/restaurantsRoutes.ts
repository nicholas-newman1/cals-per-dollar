import { Router } from "express";
import {
  getRestaurantById,
  getAllRestaurants,
} from "../controllers/restaurantsController";
import { validateRequest } from "../utils/validationUtil";
import getByIdSchema from "../schemas/common/getByIdSchema";

const router: Router = Router();
router.get(
  "/v1/get-by-id",
  validateRequest(getByIdSchema, "query"),
  getRestaurantById
);
router.get("/v1/get-all", getAllRestaurants);

export default router;
