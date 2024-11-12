"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // List of tables to update
    const tables = [
      "cpd_menu_item_tags",
      "cpd_restaurant_tags",
      "cpd_roles",
      "cpd_user_roles",
      "cpd_users",
    ];

    // Loop through each table to drop old columns and add new ones
    for (const table of tables) {
      // Remove existing `createdAt` and `updatedAt` columns
      await queryInterface.removeColumn(table, "createdAt");
      await queryInterface.removeColumn(table, "updatedAt");

      // Add `created_at` and `updated_at` columns with the correct settings
      await queryInterface.addColumn(table, "created_at", {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      });
      await queryInterface.addColumn(table, "updated_at", {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      });
    }
  },

  async down(queryInterface, Sequelize) {
    // List of tables to revert changes
    const tables = [
      "cpd_menu_item_tags",
      "cpd_restaurant_tags",
      "cpd_roles",
      "cpd_user_roles",
      "cpd_users",
    ];

    // Loop through each table to drop new columns and restore old ones
    for (const table of tables) {
      // Remove `created_at` and `updated_at` columns
      await queryInterface.removeColumn(table, "created_at");
      await queryInterface.removeColumn(table, "updated_at");

      // Add `createdAt` and `updatedAt` columns with default values
      await queryInterface.addColumn(table, "createdAt", {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      });
      await queryInterface.addColumn(table, "updatedAt", {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      });
    }
  },
};
