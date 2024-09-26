import db from "../config/db";
import { CategoryDto, CategoryEntity } from "../types/categories";

export const insertCategory = async (category: CategoryDto) => {
  const [insertId] = await db("cpd_categories").insert({
    name: category.name,
    restaurant_id: category.restaurantId,
  });

  return insertId;
};

export const deleteAllCategories = async (restaurantId: string) =>
  await db("cpd_categories").where("restaurant_id", restaurantId).del();

export const getCategoriesByRestaurant = async (restaurantId: string) =>
  await db<CategoryEntity>("cpd_categories")
    .where("restaurant_id", restaurantId)
    .select("*");
