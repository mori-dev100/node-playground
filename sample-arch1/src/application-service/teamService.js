import { Team } from "../model/team";
import teamRepository from "../repository/teamRepository";

class UserService {
  constructor(repository) {
    this.teamRepository = repository;
  }

  /**
   * @param id {number} userId
   * @returns Promise<User>
   */
  async fetchOneUser(id) {
    const data = await this.teamRepository.get(id);
    const team = new Team(data[0].created_user_id);
    return team;
  }

  /**
   * @returns Promise<User[]>
   */
  async fetchAllUsers() {
    const data = await this.teamRepository.all();

    const teams = data.map((item) => new Team(item.created_user_id));
    return teams;
  }
}
const userSerivce = new UserService(teamRepository);

export default userSerivce;
