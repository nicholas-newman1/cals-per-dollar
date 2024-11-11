"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "cpd_roles",
      [
        {
          id: 1,
          name: "ADMIN",
        },
      ],
      {
        ignoreDuplicates: true, // Ensures that the migration can be safely run multiple times without duplicating the role
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("cpd_roles", { id: 1 }, {});
  },
};
