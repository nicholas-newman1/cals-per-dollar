import { Router } from "express";
import {
  getRestaurantById,
  getAllRestaurants,
} from "../controllers/restaurantsController";

const router: Router = Router();
router.get("/v1/get-by-id", getRestaurantById);
router.get("/v1/get-all", getAllRestaurants);

export default router;
