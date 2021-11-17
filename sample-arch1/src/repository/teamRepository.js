import BaseRepository from "./baseRepository";

/**
 * @typedef DBoptions
 * @property transaction? {import('knex').transaction}
 * @property include? {String[]}
 */

class TeamRepository extends BaseRepository {
  constructor() {
    super();
  }

  /**
   *
   * @param {DBoptions} options
   * @returns {Array<any>}
   */
  async all(options) {
    const knex = this.transactionContextHelper(options);

    const data = await knex("teams").select(["created_user_id"]);
    return data;
  }

  /**
   * @param id {string} teamId
   * @param options {DBoptions}
   */
  async get(id, options) {
    const knex = this.transactionContextHelper(options);

    if (options && this.isEqualsInclude(options.include, ["user"])) {
      const data = await knex
        .select("*")
        .from("teams")
        .join("users", { "teams.created_user_id": "users.id" })
        .where({ "teams.id": id });
      return data;
    } else {
      const data = await knex("teams").select("*").where({ id: id });
      return data;
    }
  }
}

const teamRepository = new TeamRepository();
export default teamRepository;
