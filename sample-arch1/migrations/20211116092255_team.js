/**
 * @param knex {import('knex').Knex}
 */
exports.up = function (knex) {
  return knex.schema.createTable("teams", (table) => {
    table.increments("id");
    table.integer("userId").unsigned().notNullable();
    table.foreign("userId").references("users.id");
  });
};

/**
 * @param knex {import('knex').Knex}
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("teams");
};
