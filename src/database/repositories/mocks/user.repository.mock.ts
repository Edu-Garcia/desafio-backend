import { v4 as uuidv4 } from 'uuid';
import { ICreateUserInput, IUsersRepository } from '../../../models/user.model';
import User from '../../entities/User.Entity';

export class UsersRepositoryMock implements IUsersRepository {
  private users: User[] = [
    {
      id: '1',
      name: 'Admin',
      password: '123456',
      birth_date: new Date('01/01/2000'),
      cpf: '00000000000',
      observations: '',
      permission: 'admin',
      created_at: new Date('01/01/2022'),
      updated_at: new Date('01/01/2022'),
    },
    {
      id: '2',
      name: 'Colaborator',
      password: '123456',
      birth_date: new Date('01/01/2000'),
      cpf: '22222222222',
      observations: '',
      permission: 'colaborator',
      created_at: new Date('01/01/2022'),
      updated_at: new Date('01/01/2022'),
    },
  ];

  public async create({
    name,
    password,
    birth_date,
    cpf,
    observations,
    permission,
  }: ICreateUserInput): Promise<User> {
    const user = new User();

    user.id = uuidv4();
    user.name = name;
    user.password = password;
    user.birth_date = birth_date;
    user.cpf = cpf;
    user.observations = observations;
    user.permission = permission;

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    Object.assign(this.users, user);

    return user;
  }

  public async remove(user: User): Promise<void> {
    this.users = this.users.filter((u) => u.id !== user.id);
  }

  public async find(): Promise<User[]> {
    return this.users;
  }

  public async findAdmin(id: string): Promise<User | undefined> {
    return this.users.find((u) => u.id === id && u.permission === 'admin');
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find((u) => u.id === id);
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    return this.users.find((u) => u.cpf === cpf);
  }
}
