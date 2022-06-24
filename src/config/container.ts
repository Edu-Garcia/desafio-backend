import { container } from 'tsyringe';
import { IUsersRepository } from '../models/user.model';
import { UsersRepository } from '../database/repositories/user.repository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);
