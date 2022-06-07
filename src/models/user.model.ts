export interface User {
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

export interface CreateUserInput {
  name: string;
  password: string;
  birth_date: Date;
  cpf: string;
  observations?: string;
  permission: string;
}

export interface UpdateUserInput {
  id: string;
  observations?: string;
  permission?: string;
}

export interface UserRepository {
  create(data: CreateUserInput): Promise<User>;
  save(user: User): Promise<User>;
  remove(user: User): Promise<void>;
  findById(id: string): Promise<User | undefined>;
  findByCpf(cpf: string): Promise<User | undefined>;
}
