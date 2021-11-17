/**
 * @param knex {import('knex').Knex}
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.integer("id").primary();
    table.string("name");
    table.string("email");
  });
};

/**
 * @param knex {import('knex').Knex}
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
