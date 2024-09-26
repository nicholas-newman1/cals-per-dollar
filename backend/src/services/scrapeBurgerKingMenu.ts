import axios from "axios";
import * as cheerio from "cheerio";
import RestaurantEnum from "../types/restaurantEnum";
import { Element } from "domhandler";
import { deleteAllCategories, insertCategory } from "../daos/categoryDao";
import { MenuItemDto } from "../types/menuItem";
import { deleteAllMenuItems, insertMenuItems } from "../daos/menuItemDao";

const url =
  "https://thecanadianmenuprices.com/burger-king-menu-prices-in-canada/";

const scrapeBurgerKingMenu = async (): Promise<void> => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const getCategoryName = (elem: Element): string => {
      const name = $(elem).text().trim();
      return name;
    };

    const categories: { [key: string]: string } = {};
    const restaurantId = RestaurantEnum.BURGER_KING;

    await Promise.all([
      deleteAllMenuItems(restaurantId),
      deleteAllCategories(restaurantId),
    ]);

    const categoryElements = $("h2.has-background").toArray();
    const categoriesToSkip = [
      "Limited Time Offer",
      "Drinks & Coffee",
      "Condiments",
      "King Jr. Kids Meal",
      "Stretch Your Dollar",
    ];

    for (const elem of categoryElements) {
      const categoryName = getCategoryName(elem);

      if (
        categoryName &&
        !categories[categoryName] &&
        !categoriesToSkip.includes(categoryName)
      ) {
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
    $("h2, tr").each((_, elem) => {
      if ($(elem).is("h2")) {
        const categoryName = getCategoryName(elem);
        currentCategoryId = categories[categoryName] || null;
      } else if ($(elem).is("tr") && currentCategoryId) {
        const firstTd = $(elem).find("td").first();
        const secondTd = firstTd.next();
        const thirdTd = secondTd.next();
        const itemName = firstTd
          .text()
          .trim()
          .replace(/®|NEW! /g, "");
        const itemPrice = parseFloat(
          secondTd
            .text()
            .match(/[\d.]+/g)
            ?.join("") || ""
        );
        const itemCalories = parseInt(
          thirdTd
            .text()
            .match(/[\d,]+(?=\s*)/)?.[0]
            ?.replace(/,/g, "") || "",
          10
        );

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
            restaurantId,
            categoryId: "" + currentCategoryId,
          });
        }
      }
    });

    insertMenuItems(items);

    console.log(
      "Burger King menu items and categories have been added to the database."
    );
  } catch (error: any) {
    console.error(error);
  }
};

export default scrapeBurgerKingMenu;
