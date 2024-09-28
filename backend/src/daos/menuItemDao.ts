import db from "../config/db";
import { MenuItemDto, MenuItemEntity } from "../types/menuItem";
import RestaurantEnum from "../types/restaurantEnum";

export const searchMenuItems = async (query: string, restaurant?: string) =>
  await db<MenuItemEntity>("cpd_menu_items")
    .whereRaw("MATCH(name) AGAINST(? IN BOOLEAN MODE)", [`${query}*`])
    .modify((qb) => {
      if (restaurant) {
        qb.andWhere("restaurant_id", restaurant);
      }
    });

export const insertMenuItems = async (items: MenuItemDto[]) =>
  await db("cpd_menu_items").insert(
    items.map((item) => ({
      name: item.name,
      price: item.price,
      calories: item.calories,
      restaurant_id: item.restaurantId,
      category_id: item.categoryId,
    }))
  );

export const deleteAllMenuItems = async (restaurantId?: RestaurantEnum) =>
  restaurantId
    ? await db("cpd_menu_items").where("restaurant_id", restaurantId).del()
    : await db("cpd_menu_items").del();

export const getTopCaloriesPerDollarForEachCategory = async (
  categoryIds: string[],
  restaurantId: string
) => {
  return await Promise.all([
    db<MenuItemEntity>("cpd_menu_items")
      .where("restaurant_id", restaurantId)
      .orderByRaw("calories / price desc")
      .then((items) => ({ categoryName: "Overall", categoryId: "", items })),

    ...categoryIds.map(async (categoryId) => {
      const items = await db<MenuItemEntity>("cpd_menu_items")
        .where("category_id", categoryId)
        .orderByRaw("calories / price desc");

      return { categoryId, items };
    }),
  ]);
};
