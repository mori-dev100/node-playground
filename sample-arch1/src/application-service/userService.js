import { User } from "../model/user";
import userRepository from "../repository/userRepository";


class UserService {
  constructor(repository) {
    this.userRepository = repository;
  }

  /**
   * @param id {number} userId
   * @returns Promise<User>
   */
  async fetchOneUser(id) {
    const data = await this.userRepository.get(id);
    const user = new User(data.name, data.email);
    return user;
  }

  /**
   * @returns Promise<User[]>
   */
  async fetchAllUsers() {
    const data = await this.userRepository.all();

    const users = data.map((item) => new User(item.name, item.email));
    return users;
  }
}
const userSerivce = new UserService(userRepository);

export default userSerivce;
