exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, name: "AAA", email: "aa@example.com" },
        { id: 2, name: "BBB", email: "bb@example.com" },
        { id: 3, name: "CCC", email: "cc@example.com" },
      ]);
    });
};
