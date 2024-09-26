exports.up = function (knex) {
  return knex("cpd_restaurants").insert([{ id: 4, name: "Taco Bell" }]);
};

exports.down = function (knex) {
  return knex("cpd_restaurants").where({ id: 4 }).del();
};
