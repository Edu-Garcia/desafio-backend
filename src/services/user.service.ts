import { hash } from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { getRepository } from 'typeorm';
import config from '../config/config';
import UserEntity from '../database/entities/User.Entity';
import { CreateUserInput, UpdateUserInput } from '../models/user.model';
import ApiError from '../utils/apiError.utils';
import { calculateAge } from '../utils/calculateAge';

export async function getUsers(): Promise<UserEntity[]> {
  const repository = getRepository(UserEntity);
  const users = repository.find();
  return users;
}

export async function getUser(id: string): Promise<UserEntity | undefined> {
  const repository = getRepository(UserEntity);
  const user = repository.findOne({ id });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, true, 'User not found');
  }

  return user;
}

export async function createUser(
  requesterId: string,
  input: CreateUserInput
): Promise<UserEntity> {
  const { password, cpf } = input;
  let { birth_date: birthDate } = input;

  const repository = getRepository(UserEntity);

  const requesterAdmin = await repository.findOne({
    id: requesterId,
    permission: 'admin',
  });

  if (!requesterAdmin) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      true,
      'Only admins can create users'
    );
  }

  if (Object.prototype.toString.call(birthDate) !== '[object Date]') {
    birthDate = new Date(birthDate);
  }

  const userAge = calculateAge(birthDate);

  if (userAge < 18) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      true,
      'Users must be at least 18 years old'
    );
  }

  if (userAge > 200) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, true, 'Invalid birth date');
  }

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

export async function updateUser(
  requesterId: string,
  input: UpdateUserInput
): Promise<UserEntity> {
  const { id, observations, permission } = input;

  const repository = getRepository(UserEntity);

  const requesterAdmin = await repository.findOne({
    id: requesterId,
    permission: 'admin',
  });

  if (!requesterAdmin) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      true,
      'Only admins can update users'
    );
  }

  const user = await repository.findOne({ id });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, true, 'User not found');
  }

  user.observations = observations || user.observations;
  user.permission = permission || user.permission;

  await repository.save(user);
  return user;
}

export async function deleteUser(
  requesterId: string,
  id: string
): Promise<void> {
  const repository = getRepository(UserEntity);

  const requesterAdmin = await repository.findOne({
    id: requesterId,
    permission: 'admin',
  });

  if (!requesterAdmin) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      true,
      'Only admins can delete users'
    );
  }

  const user = await repository.findOne({ id });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, true, 'User not found');
  }

  await repository.remove(user);
}
