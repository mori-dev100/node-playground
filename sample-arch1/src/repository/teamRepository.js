import knex from "../db/index";

async function all() {
  const data = await knex("teams").select(["created_user_id"]);

  return data;
}

async function get(id) {
  const data = await knex("teams").select(["created_user_id"]).where({ id: id });

  return data;
}

export default {
  all,
  get,
};
