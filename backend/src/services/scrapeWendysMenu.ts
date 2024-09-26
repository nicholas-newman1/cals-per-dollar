import axios from "axios";
import { MenuItemDto } from "../types/menuItem";
import RestaurantEnum from "../types/restaurantEnum";
import { deleteAllMenuItems, insertMenuItems } from "../daos/menuItemDao";
import { insertCategory, deleteAllCategories } from "../daos/categoryDao";
import * as cheerio from "cheerio";

const url = "https://wendysmenu.ca/";

const scrapeWendysMenu = async (): Promise<void> => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const categories: { [key: string]: string } = {};
    const restaurantId = RestaurantEnum.WENDYS;

    await Promise.all([
      deleteAllMenuItems(restaurantId),
      deleteAllCategories(restaurantId),
    ]);

    const categoryElements = $("h3").toArray();
    for (const elem of categoryElements) {
      const categoryName = $(elem).text().trim();

      if (
        categoryName &&
        !categories[categoryName] &&
        // best selling items creates duplicates in the database
        categoryName !== "Best Selling Items"
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

    $("h3, tr").each((_, elem) => {
      if ($(elem).is("h3")) {
        const categoryName = $(elem).text().trim();
        currentCategoryId = categories[categoryName] || null;
      } else if ($(elem).is("tr") && currentCategoryId) {
        const itemName = $(elem)
          .find('[data-col-index="0"]')
          .text()
          .trim()
          .replace(/®/g, "");

        const itemPrice = parseFloat(
          $(elem)
            .find('[data-col-index="1"]')
            .text()
            .match(/[\d.]+/g)
            ?.join("") || ""
        );

        const itemCaloriesText = $(elem).find('[data-col-index="2"]').text();

        const calorieMatches = itemCaloriesText.match(
          /(\d{1,3}(,\d{3})*|\d+)/g
        );

        let itemCalories = 0;

        if (calorieMatches) {
          // Daves single is an exception because of poor data quality
          if (itemName === "Dave’s Single") {
            itemCalories = Math.min(
              ...calorieMatches.map((cal) =>
                parseInt(cal.replace(/,/g, ""), 10)
              )
            );
          } else {
            itemCalories = Math.max(
              ...calorieMatches.map((cal) =>
                parseInt(cal.replace(/,/g, ""), 10)
              )
            );
          }
        }

        if (
          itemName &&
          itemPrice &&
          itemCalories &&
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
      "Wendy's menu items and categories have been added to the database."
    );
  } catch (error: any) {
    console.error(error);
  }
};

export default scrapeWendysMenu;
