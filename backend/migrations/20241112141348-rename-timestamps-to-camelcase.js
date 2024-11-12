"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const tables = [
      "cpd_menu_items",
      "cpd_menu_item_tags",
      "cpd_restaurant_tags",
      "cpd_roles",
      "cpd_user_roles",
      "cpd_users",
      "cpd_categories",
      "cpd_restaurants",
      "cpd_tags", // Added `cpd_tags` to the list
    ];

    // Add new `createdAt` and `updatedAt` columns with the correct type (TIMESTAMP) and default values
    for (const table of tables) {
      // Add new `createdAt` column
      await queryInterface.addColumn(table, "createdAt", {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      });

      // Add new `updatedAt` column
      await queryInterface.addColumn(table, "updatedAt", {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      });

      // Now remove the old `created_at` and `updated_at` columns
      await queryInterface.removeColumn(table, "created_at");
      await queryInterface.removeColumn(table, "updated_at");
    }
  },

  async down(queryInterface, Sequelize) {
    const tables = [
      "cpd_menu_items",
      "cpd_menu_item_tags",
      "cpd_restaurant_tags",
      "cpd_roles",
      "cpd_user_roles",
      "cpd_users",
      "cpd_categories",
      "cpd_restaurants",
      "cpd_tags", // Added `cpd_tags` to the list
    ];

    // Remove the new `createdAt` and `updatedAt` columns
    for (const table of tables) {
      await queryInterface.removeColumn(table, "createdAt");
      await queryInterface.removeColumn(table, "updatedAt");

      // Optionally, you can restore the old `created_at` and `updated_at` columns here if needed
      await queryInterface.addColumn(table, "created_at", {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      });
      await queryInterface.addColumn(table, "updated_at", {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      });
    }
  },
};
