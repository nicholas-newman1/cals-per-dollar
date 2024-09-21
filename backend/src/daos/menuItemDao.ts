import db from "../config/db";
import { MenuItemDto, MenuItemEntity } from "../types/menuItem";
import RestaurantEnum from "../types/restaurantEnum";

export const searchMenuItems = async (
  query: string,
  restaurant?: string
): Promise<MenuItemEntity[]> => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM cpd_menu_items WHERE name LIKE ? ${
        restaurant ? "AND restaurant_id = ?" : ""
      }`,
      [`%${query}%`, restaurant],
      (err, results) =>
        err ? reject(err) : resolve(results as MenuItemEntity[])
    );
  });
};

export const insertMenuItems = async (items: MenuItemDto[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO cpd_menu_items (name, price, calories, restaurant_id, category_id) VALUES ?",
      [items.map((item) => Object.values(item))],
      (err) => (err ? reject(err) : resolve())
    );
  });
};

export const deleteAllMenuItems = async (
  restaurantId?: RestaurantEnum
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (restaurantId) {
      db.query(
        "DELETE FROM cpd_menu_items WHERE restaurant_id = ?",
        [restaurantId],
        (err) => (err ? reject(err) : resolve())
      );
    } else {
      db.query("DELETE FROM menu_items", (err) =>
        err ? reject(err) : resolve()
      );
    }
  });
};

export const getTopCaloriesPerDollarForEachCategory = async (
  categoryIds: string[],
  restaurantId: string
): Promise<
  {
    categoryId: string;
    items: MenuItemEntity[];
  }[]
> => {
  const promises = categoryIds.map((categoryId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM cpd_menu_items WHERE category_id = ? ORDER BY calories / price DESC",
        [categoryId],
        (err, results) =>
          err
            ? reject(err)
            : resolve({ categoryId, items: results as MenuItemEntity[] })
      );
    });
  });

  // add top overall items regardless of category
  promises.unshift(
    new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM cpd_menu_items WHERE restaurant_id = ? ORDER BY calories / price DESC",
        [restaurantId],
        (err, results) =>
          err
            ? reject(err)
            : resolve({
                categoryId: "overall",
                categoryName: "Overall",
                items: results as MenuItemEntity[],
              })
      );
    })
  );

  const results = await Promise.all(promises);

  return results as {
    categoryId: string;
    items: MenuItemEntity[];
  }[];
};
