module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tags = [
      // Cuisine Types
      "Italian",
      "Mexican",
      "Chinese",
      "Japanese",
      "Indian",
      "Thai",
      "Greek",
      "Middle Eastern",
      "American",
      "French",
      "Mediterranean",
      "Korean",
      "Vietnamese",
      // Restaurant Types
      "Fast Food",
      "Casual Dining",
      "Fine Dining",
      "Buffet",
      "Food Truck",
      "Café",
      "Diner",
      "Bakery",
      // Meal Types
      "Breakfast",
      "Lunch",
      "Dinner",
      "Dessert",
      "Limited-Time Offer",
      // Dietary Preferences
      "Vegetarian",
      "Vegan",
      "Gluten-Free",
      "Dairy-Free",
      "Nut-Free",
      "Keto",
      "Paleo",
      "Halal",
      "Kosher",
      // Health & Nutrition
      "High Protein",
      "Low Fat",
      "Low Carbs",
      // Food Type / Ingredients
      "Seafood",
      "Steak",
      "Burgers",
      "Pizza",
      "Pasta",
      "Sushi",
      "Salads",
      "Tacos",
      "Ramen",
      "BBQ",
      "Sandwiches",
    ];

    const tagData = tags.map((tag) => ({ name: tag }));

    await queryInterface.bulkInsert("cpd_tags", tagData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("cpd_tags", null, {});
  },
};
