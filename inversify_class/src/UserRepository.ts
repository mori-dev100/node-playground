import { injectable } from 'inversify';

@injectable()
export class UserRepository {
  private userStore: any[] = [];

  constructor() {
    // seeds
    this.userStore = ['user1', 'user2'];
  }

  public list() {
    return this.userStore;
  }

  public insert(val: any) {
    this.userStore.push(val);
  }
}
