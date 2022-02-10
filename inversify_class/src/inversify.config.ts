import { Container } from 'inversify';
import { UserRepository } from './UserRepository';
import { UserService } from './UserService';

const container = new Container();

container.bind(UserRepository).toSelf();
container.bind(UserService).toSelf();

export { container };
