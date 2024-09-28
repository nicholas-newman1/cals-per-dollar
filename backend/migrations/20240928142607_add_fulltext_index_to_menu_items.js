exports.up = function (knex) {
  return knex.schema.alterTable("cpd_menu_items", (table) => {
    table.text("name").alter();
    table.index("name", "name_fulltext_idx", "FULLTEXT");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("cpd_menu_items", (table) => {
    table.dropIndex("name", "name_fulltext_idx");
  });
};
