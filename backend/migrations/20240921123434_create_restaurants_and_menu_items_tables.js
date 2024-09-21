exports.up = function (knex) {
  return (
    knex.schema
      .createTable("restaurants", function (table) {
        table.increments("id").primary();
        table.string("name", 255).notNullable();
        table.string("location", 255); // Optional field
        table.string("website", 255); // Optional field
        table.timestamp("created_at").defaultTo(knex.fn.now());
      })
      .createTable("categories", function (table) {
        table.increments("id").primary();
        table
          .integer("restaurant_id")
          .unsigned()
          .references("id")
          .inTable("restaurants")
          .onDelete("CASCADE");
        table.string("name", 255).notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
      })
      .createTable("menu_items", function (table) {
        table.increments("id").primary();
        table
          .integer("restaurant_id")
          .unsigned()
          .references("id")
          .inTable("restaurants")
          .onDelete("CASCADE");
        table
          .integer("category_id")
          .unsigned()
          .references("id")
          .inTable("categories")
          .onDelete("SET NULL");
        table.string("name", 255).notNullable();
        table.decimal("price", 10, 2).notNullable();
        table.integer("calories").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        // Use raw SQL to add ON UPDATE CURRENT_TIMESTAMP for 'updated_at'
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
      // Alter table to add ON UPDATE CURRENT_TIMESTAMP for 'updated_at'
      .then(() => {
        return knex.raw(`
          ALTER TABLE menu_items 
          MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        `);
      })
      .then(() => {
        // Insert data into 'restaurants' table
        return knex("restaurants").insert([
          { id: 1, name: "McDonald's" },
          { id: 2, name: "Wendy's" },
        ]);
      })
  );
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("menu_items")
    .dropTableIfExists("categories")
    .dropTableIfExists("restaurants");
};
