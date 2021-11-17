/**
 * @param knex {import('knex').Knex}
 */
exports.up = function (knex) {
  return knex.schema.createTable("teams", (table) => {
    table.increments("id");
    table.integer("created_user_id").unsigned();
    table.foreign("created_user_id").references("users.id");
  });
};

/**
 * @param knex {import('knex').Knex}
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("teams");
};
