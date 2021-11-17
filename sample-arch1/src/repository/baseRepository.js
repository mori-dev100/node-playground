import db from "../db";
export default class BaseRepository {
  constructor() {}

  /**
   * @param {DBoptions}
   * @returns {import('knex').Knex}
   */
  transactionContextHelper(options) {
    let knex;
    if (options && options.transaction) {
      knex = options.transaction;
    } else {
      knex = db;
    }

    return knex;
  }

  /**
   *
   * @param {(trx: import('knex').Knex)=>any} callback
   * @returns Promise<any>
   */
  async transaction(callback) {
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
}
