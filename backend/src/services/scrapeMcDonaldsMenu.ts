import axios from "axios";
import { MenuItemDto } from "../types/menuItem";
import RestaurantEnum from "../types/restaurantEnum";
import { deleteAllMenuItems, insertMenuItems } from "../daos/menuItemDao";
import { insertCategory, deleteAllCategories } from "../daos/categoryDao";
import * as cheerio from "cheerio";
import { Element } from "domhandler";

const url = "https://mcdonalds-menu.ca/mcdonalds-menu-toronto/";

const scrapeMcDonaldsMenu = async (): Promise<void> => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const getCategoryName = (elem: Element): string => {
      const name = $(elem).text().trim();
      if (name === "Bees") return "Burgers";
      return name;
    };

    const categories: { [key: string]: string } = {};
    const restaurantId = RestaurantEnum.MCDONALDS;

    await Promise.all([
      deleteAllMenuItems(restaurantId),
      deleteAllCategories(restaurantId),
    ]);

    const categoryElements = $("h4").toArray();
    for (const elem of categoryElements) {
      const categoryName = getCategoryName(elem);

      if (categoryName && !categories[categoryName]) {
        const categoryId = await insertCategory({
          name: categoryName,
          restaurantId,
        });
        categories[categoryName] = categoryId;
      }
    }

    const items: MenuItemDto[] = [];
    let currentCategoryId: string | null = null;

    // Loop over the elements and group items under categories
    $("h4, tr").each((_, elem) => {
      if ($(elem).is("h4")) {
        const categoryName = getCategoryName(elem);
        currentCategoryId = categories[categoryName] || null;
      } else if ($(elem).is("tr") && currentCategoryId) {
        const itemName = $(elem).find(".column-1").text().trim();
        const itemPrice = parseFloat($(elem).find(".column-2").text().slice(1));
        const itemCalories = parseInt($(elem).find(".column-3").text().trim());

        if (
          itemName &&
          !isNaN(itemPrice) &&
          !isNaN(itemCalories) &&
          restaurantId &&
          currentCategoryId
        ) {
          items.push({
            name: itemName,
            price: itemPrice,
            calories: itemCalories,
            restaurantId: restaurantId,
            categoryId: "" + currentCategoryId,
          });
        }
      }
    });

    insertMenuItems(items);

    console.log(
      "McDonald's menu items and categories have been added to the database."
    );
  } catch (error: any) {
    console.error(error);
  }
};

export default scrapeMcDonaldsMenu;
