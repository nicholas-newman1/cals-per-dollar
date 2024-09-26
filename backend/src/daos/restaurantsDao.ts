import db from "../config/db";
import { RestaurantEntity } from "../types/restaurant";

export const getRestaurantById = async (id: string) =>
  await db<RestaurantEntity>("cpd_restaurants").where("id", id).first();

export const getAllRestaurants = async () =>
  await db<RestaurantEntity>("cpd_restaurants").select("*");
