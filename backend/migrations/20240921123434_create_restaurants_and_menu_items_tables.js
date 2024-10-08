exports.up = function (knex) {
  return knex.schema
    .createTable("cpd_restaurants", function (table) {
      table.increments("id").primary();
      table.string("name", 255).notNullable();
      table.string("location", 255); // Optional field
      table.string("website", 255); // Optional field
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("cpd_categories", function (table) {
      table.increments("id").primary();
      table
        .integer("restaurant_id")
        .unsigned()
        .references("id")
        .inTable("cpd_restaurants")
        .onDelete("CASCADE");
      table.string("name", 255).notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("cpd_menu_items", function (table) {
      table.increments("id").primary();
      table
        .integer("restaurant_id")
        .unsigned()
        .references("id")
        .inTable("cpd_restaurants")
        .onDelete("CASCADE");
      table
        .integer("category_id")
        .unsigned()
        .references("id")
        .inTable("cpd_categories")
        .onDelete("SET NULL");
      table.string("name", 255).notNullable();
      table.decimal("price", 10, 2).notNullable();
      table.integer("calories").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .then(() => {
      return knex.raw(`
          ALTER TABLE cpd_menu_items 
          MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        `);
    })
    .then(() => {
      return knex("cpd_restaurants").insert([
        { id: 1, name: "McDonald's" },
        { id: 2, name: "Wendy's" },
      ]);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("cpd_menu_items")
    .dropTableIfExists("cpd_categories")
    .dropTableIfExists("cpd_restaurants");
};
