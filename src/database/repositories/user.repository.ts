import { getRepository, Repository } from 'typeorm';
import { ICreateUserInput, IUsersRepository } from '../../models/user.model';
import User from '../entities/User.Entity';

export class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    password,
    birth_date,
    cpf,
    observations,
    permission,
  }: ICreateUserInput): Promise<User> {
    const user = this.ormRepository.create({
      name,
      password,
      birth_date,
      cpf,
      observations,
      permission,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    await this.ormRepository.save(user);

    return user;
  }

  public async remove(user: User): Promise<void> {
    await this.ormRepository.remove(user);
  }

  public async find(): Promise<User[]> {
    const user = await this.ormRepository.find();
    return user;
  }

  public async findAdmin(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      id,
      permission: 'admin',
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ id });
    return user;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ cpf });
    return user;
  }
}
