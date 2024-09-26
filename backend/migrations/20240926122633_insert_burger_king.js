exports.up = function (knex) {
  return knex("cpd_restaurants").insert([{ id: 3, name: "Burger King" }]);
};

exports.down = function (knex) {
  return knex("cpd_restaurants").where({ id: 3 }).del();
};
