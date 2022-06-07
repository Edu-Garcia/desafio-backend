import { hash } from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { getRepository } from 'typeorm';
import config from '../config/config';
import UserEntity from '../database/entities/User.Entity';
import { CreateUserInput, UpdateUserInput } from '../models/user.model';
import ApiError from '../utils/apiError.utils';

export async function getUsers(): Promise<UserEntity[]> {
  const repository = getRepository(UserEntity);
  const users = repository.find();
  return users;
}

export async function createUser(input: CreateUserInput): Promise<UserEntity> {
  const { password, cpf } = input;

  const repository = getRepository(UserEntity);

  const cpfExists = await repository.findOne({ cpf });

  if (cpfExists) {
    throw new ApiError(StatusCodes.CONFLICT, true, 'Cpf already exists');
  }

  const hashedPassword = await hash(password, config.saltWorkFactor);

  const newUser = repository.create({
    ...input,
    password: hashedPassword,
  });

  await repository.save(newUser);

  return newUser;
}

export async function updateUser(input: UpdateUserInput): Promise<UserEntity> {
  const { id, observations, permission } = input;

  const repository = getRepository(UserEntity);
  const user = await repository.findOne(id);

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, true, 'User not found');
  }

  user.observations = observations || user.observations;
  user.permission = permission || user.permission;

  await repository.save(user);
  return user;
}

export async function deleteUser(id: string): Promise<void> {
  const repository = getRepository(UserEntity);
  const user = await repository.findOne(id);

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, true, 'User not found');
  }

  await repository.remove(user);
}