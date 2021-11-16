import knex from "../db/index";

async function all() {
  const data = await knex("users").select(["name", "email"]);

  return data;
}

async function get(id) {
  const data = await knex("users").select(["name", "email"]).where({ id: id });

  return data;
}

export default {
  all,
  get,
};
