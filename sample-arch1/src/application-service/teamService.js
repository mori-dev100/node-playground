import { User } from "../model/user";
import { Team } from "../model/team";
import teamRepository from "../repository/teamRepository";

class TeamService {
  constructor(repository) {
    this.teamRepository = repository;
  }

  /**
   * @param id {number} userId
   * @returns Promise<User>
   */
  async fetchOneUser(id) {
    // １レコードのみのselect
    // const data = await this.teamRepository.get(id);

    // リレーションを考慮してJOINしてselect
    const data = await this.teamRepository.get(id, { include: ["user"] });

    if (data.length === 0) {
      throw new Error("empty data from DB");
    }

    const team = new Team(data[0].created_user_id);
    const user = new User(data[0].name, data[0].email);
    return { team, user };
  }

  /**
   * @returns Promise<User[]>
   */
  async fetchAllUsers() {
    const data = await this.teamRepository.all();

    const teams = data.map((item) => new Team(item.created_user_id));
    return teams;
  }

  async transactionSample() {
    return await this.teamRepository.transaction(async (trx) => {
      const data = await this.teamRepository.all({ transaction: trx });
      await this.teamRepository.get(1, { transaction: trx });

      const teams = data.map((item) => new Team(item.created_user_id));
      const oneTeam = new Team(data[0].created_user_id);

      return { teams, oneTeam };
    });
  }
}
const teamService = new TeamService(teamRepository);

export default teamService;
