"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("cpd_menu_items", "fat", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn("cpd_menu_items", "carbs", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn("cpd_menu_items", "protein", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("cpd_menu_items", "fat");
    await queryInterface.removeColumn("cpd_menu_items", "carbs");
    await queryInterface.removeColumn("cpd_menu_items", "protein");
  },
};
