/**
 * @param knex {import('knex').Knex}
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries

  await knex("users").insert([
    { name: "sample1", email: "a-a@example.com" },
    { name: "sample2", email: "a-b@example.com" },
  ]);

  const userId = await knex("users")
    .select("id")
    .orderBy("id", "desc")
    .limit(2);

  await Promise.all(
    userId.map((user) => knex("teams").insert([{ created_user_id: user.id }]))
  );
};
