export interface IUser {
  id: string;
  name: string;
  password: string;
  birth_date: Date;
  cpf: string;
  observations?: string;
  permission: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICreateUserInput {
  name: string;
  password: string;
  birth_date: Date;
  cpf: string;
  observations?: string;
  permission: string;
}

export interface IUpdateUserInput {
  id: string;
  observations?: string;
  permission?: string;
}

export interface IUsersRepository {
  create(data: ICreateUserInput): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
  remove(user: IUser): Promise<void>;
  find(): Promise<IUser[]>;
  findAdmin(id: string): Promise<IUser | undefined>;
  findById(id: string): Promise<IUser | undefined>;
  findByCpf(cpf: string): Promise<IUser | undefined>;
}
