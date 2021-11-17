/**
 * @param knex {import('knex').Knex}
 */
exports.up = function (knex) {
  return knex.schema.createTable("team-members", (table) => {
    table.integer("id").primary();

    table.integer("team_id");
    table.foreign('team_id').references('teams.id')

    table.integer("user_id");
    table.foreign('user_id').references('users.id')

  });
};

/**
 * @param knex {import('knex').Knex}
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("team-members");
};
