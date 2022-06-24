import { hash } from 'bcrypt';
import { instanceToInstance } from 'class-transformer';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import config from '../config/config';
import {
  ICreateUserInput,
  IUpdateUserInput,
  IUser,
  IUsersRepository,
} from '../models/user.model';
import ApiError from '../utils/apiError.utils';
import { calculateAge } from '../utils/calculateAge';

@injectable()
export class UserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {
    /**/
  }

  public async getUsers(): Promise<IUser[]> {
    const users = this.usersRepository.find();
    return instanceToInstance(users);
  }

  public async getUser(id: string): Promise<IUser> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, true, 'User not found');
    }

    return instanceToInstance(user);
  }

  public async createUser(
    requesterId: string,
    input: ICreateUserInput
  ): Promise<IUser> {
    const { password, cpf } = input;
    let { birth_date: birthDate } = input;

    const requesterAdmin = await this.usersRepository.findAdmin(requesterId);

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

    const cpfExists = await this.usersRepository.findByCpf(cpf);

    if (cpfExists) {
      throw new ApiError(StatusCodes.CONFLICT, true, 'Cpf already exists');
    }

    const hashedPassword = await hash(password, config.saltWorkFactor);

    const newUser = await this.usersRepository.create({
      ...input,
      password: hashedPassword,
    });

    return newUser;
  }

  public async updateUser(
    requesterId: string,
    input: IUpdateUserInput
  ): Promise<IUser> {
    const { id, observations, permission } = input;

    const requesterAdmin = await this.usersRepository.findAdmin(requesterId);

    if (!requesterAdmin) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        true,
        'Only admins can update users'
      );
    }

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, true, 'User not found');
    }

    user.observations = observations || user.observations;
    user.permission = permission || user.permission;

    await this.usersRepository.save(user);
    return user;
  }

  public async deleteUser(requesterId: string, id: string): Promise<void> {
    const requesterAdmin = await this.usersRepository.findAdmin(requesterId);

    if (!requesterAdmin) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        true,
        'Only admins can delete users'
      );
    }

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, true, 'User not found');
    }

    await this.usersRepository.remove(user);
  }
}
