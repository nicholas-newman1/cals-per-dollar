import db from "../config/db";
import { CategoryDto, CategoryEntity } from "../types/categories";

export const insertCategory = async (
  category: CategoryDto
): Promise<string> => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO cpd_categories (name, restaurant_id) VALUES (?, ?)",
      [category.name, category.restaurantId],
      (err, result) => (err ? reject(err) : resolve((result as any).insertId))
    );
  });
};

export const deleteAllCategories = async (
  restaurantId: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM cpd_categories WHERE restaurant_id = ?",
      [restaurantId],
      (err) => (err ? reject(err) : resolve())
    );
  });
};

export const getCategoriesByRestaurant = async (
  restaurantId: string
): Promise<CategoryEntity[]> => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM cpd_categories WHERE restaurant_id = ?",
      [restaurantId],
      (err, results) =>
        err ? reject(err) : resolve(results as CategoryEntity[])
    );
  });
};
