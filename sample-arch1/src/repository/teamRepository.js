import db from "../db/index";

/**
 * @typedef DBoptions
 * @property transaction? {import('knex').transaction}
 * @property include? {String[]}
 */

async function all(options) {
  const knex = transactionContextHelper(options);

  const data = await knex("teams").select(["created_user_id"]);

  return data;
}

/**
 * @param id {string} teamId
 * @param options {DBoptions}
 */
async function get(id, options) {
  const knex = transactionContextHelper(options);

  const data = await knex("teams").select("*").where({ id: id });

  return data;
}

/**
 * @param {DBoptions}
 * @returns {import('knex').Knex}
 */
function transactionContextHelper(options) {
  let knex;
  if (options && options.transaction) {
    knex = options.transaction;
  } else {
    knex = db;
  }

  return knex;
}

async function transaction(callback) {
  const trx = await db.transaction();

  try {
    const result = await callback(trx);
    await trx.commit();
    return result;
  } catch (err) {
    await trx.rollback();
    return err;
  }
}

export default {
  all,
  get,
  transaction,
};
