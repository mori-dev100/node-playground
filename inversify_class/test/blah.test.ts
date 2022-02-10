import 'reflect-metadata';
import { container } from '../src/inversify.config';
import { UserService } from '../src/UserService';

const userService = container.get(UserService);

describe('test', () => {
  test('seed test', () => {
    expect(userService.list()).toEqual(['user1', 'user2']);
  });

  test('insert', () => {
    expect(userService.list()).not.toContain('user3');
    userService.insert('user3');
    expect(userService.list()).toContain('user3');
  });
});
