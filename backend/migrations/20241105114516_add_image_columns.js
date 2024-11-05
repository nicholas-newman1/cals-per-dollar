exports.up = async function (knex) {
  await knex.schema.alterTable("cpd_restaurants", (table) => {
    table.string("image_url");
  });

  await knex.schema.alterTable("cpd_categories", (table) => {
    table.string("image_url");
  });

  await knex.schema.alterTable("cpd_menu_items", (table) => {
    table.string("image_url");
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable("cpd_restaurants", (table) => {
    table.dropColumn("image_url");
  });

  await knex.schema.alterTable("cpd_categories", (table) => {
    table.dropColumn("image_url");
  });

  await knex.schema.alterTable("cpd_menu_items", (table) => {
    table.dropColumn("image_url");
  });
};
