"use strict";

exports.up = async function (knex) {
  // Add updated_at column to `cpd_restaurants` if it doesn't already exist
  const hasUpdatedAtRestaurants = await knex.schema.hasColumn(
    "cpd_restaurants",
    "updated_at"
  );
  if (!hasUpdatedAtRestaurants) {
    await knex.schema.alterTable("cpd_restaurants", (table) => {
      table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    });
  }

  // Ensure updated_at column is NOT NULL in `cpd_restaurants` by updating existing rows
  await knex.raw(
    `UPDATE cpd_restaurants SET updated_at = NOW() WHERE updated_at IS NULL;`
  );

  // Alter the column to make sure it's NOT NULL from now on with a default value
  await knex.schema.alterTable("cpd_restaurants", (table) => {
    table
      .timestamp("updated_at")
      .notNullable()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"))
      .alter();
  });

  // Add updated_at column to `cpd_categories` if it doesn't already exist
  const hasUpdatedAtCategories = await knex.schema.hasColumn(
    "cpd_categories",
    "updated_at"
  );
  if (!hasUpdatedAtCategories) {
    await knex.schema.alterTable("cpd_categories", (table) => {
      table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    });
  }

  // Ensure updated_at column is NOT NULL in `cpd_categories` by updating existing rows
  await knex.raw(
    `UPDATE cpd_categories SET updated_at = NOW() WHERE updated_at IS NULL;`
  );

  // Alter the column to make sure it's NOT NULL from now on with a default value
  await knex.schema.alterTable("cpd_categories", (table) => {
    table
      .timestamp("updated_at")
      .notNullable()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"))
      .alter();
  });
};

exports.down = async function (knex) {
  // Revert the changes to allow NULL values for `updated_at` column in `cpd_restaurants`
  await knex.schema.alterTable("cpd_restaurants", (table) => {
    table.timestamp("updated_at").nullable().alter();
  });

  // Revert the changes to allow NULL values for `updated_at` column in `cpd_categories`
  await knex.schema.alterTable("cpd_categories", (table) => {
    table.timestamp("updated_at").nullable().alter();
  });
};
