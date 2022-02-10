import { inject, injectable } from 'inversify';
import { UserRepository } from './UserRepository';

@injectable()
export class UserService {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}

  public list() {
    return this.userRepository.list();
  }

  public insert(val: any) {
    this.userRepository.insert(val);
  }
}
