import 'reflect-metadata';
import { UsersRepositoryMock } from '../../src/database/repositories/mocks/user.repository.mock';
import { UserService } from '../../src/services/user.service';
import ApiError from '../../src/utils/apiError.utils';

describe('User Service Test Suite', () => {
  let userService: UserService;
  let usersRepositoryMock;
  const userMock = {
    id: '2',
    name: 'Colaborator',
    password: '123456',
    birth_date: new Date('01/01/2000'),
    cpf: '22222222222',
    observations: '',
    permission: 'colaborator',
    created_at: new Date('01/01/2022'),
    updated_at: new Date('01/01/2022'),
  };

  beforeEach(() => {
    usersRepositoryMock = new UsersRepositoryMock();
    userService = new UserService(usersRepositoryMock);
  });

  describe('Get Users', () => {
    it('should return all users', async () => {
      const users = await userService.getUsers();
      expect(users).toHaveLength(2);
    });
  });

  describe('Get User', () => {
    it('should return a user', async () => {
      const user = await userService.getUser('2');
      expect(user).toMatchObject(userMock);
    });

    it('should not found a user', async () => {
      expect(userService.getUser('0')).rejects.toBeInstanceOf(ApiError);
    });
  });

  describe('Create User', () => {
    it('should create a new user', async () => {
      const user = await userService.createUser('1', {
        name: 'Eduardo Garcia',
        password: '123456',
        birth_date: new Date('01/01/2000'),
        cpf: '99999999999',
        observations: '',
        permission: 'admin',
      });
      expect(user).toHaveProperty('id');
    });

    it('colaborators should not be able create users', () => {
      expect(
        userService.createUser('2', {
          name: 'Eduardo Garcia',
          password: '123456',
          birth_date: new Date('01/01/2000'),
          cpf: '99999999999',
          observations: '',
          permission: 'admin',
        })
      ).rejects.toBeInstanceOf(ApiError);
    });

    it('should not be able create users least 18 years old', () => {
      expect(
        userService.createUser('1', {
          name: 'Eduardo Garcia',
          password: '123456',
          birth_date: new Date(),
          cpf: '99999999999',
          observations: '',
          permission: 'admin',
        })
      ).rejects.toBeInstanceOf(ApiError);
    });

    it('should not be able to create users older than 200 years', () => {
      expect(
        userService.createUser('1', {
          name: 'Eduardo Garcia',
          password: '123456',
          birth_date: new Date('01/01/2200'),
          cpf: '99999999999',
          observations: '',
          permission: 'admin',
        })
      ).rejects.toBeInstanceOf(ApiError);
    });

    it('should not be able to create two users with the same cpf', () => {
      expect(
        userService.createUser('1', {
          name: 'Eduardo Garcia',
          password: '123456',
          birth_date: new Date('01/01/2000'),
          cpf: '00000000000',
          observations: '',
          permission: 'admin',
        })
      ).rejects.toBeInstanceOf(ApiError);
    });
  });

  describe('Update User', () => {
    it('should update a user', async () => {
      const user = await userService.updateUser('1', {
        id: '2',
        observations: 'Colaborator observation',
        permission: 'colaborator',
      });
      expect(user).toMatchObject({
        ...userMock,
        observations: 'Colaborator observation',
        permission: 'colaborator',
      });
    });

    it('colaborators should not be able update users', () => {
      expect(
        userService.updateUser('2', {
          id: '2',
          observations: '',
          permission: 'admin',
        })
      ).rejects.toBeInstanceOf(ApiError);
    });

    it('should not found a user', async () => {
      expect(
        userService.updateUser('1', {
          id: '0',
          observations: '',
          permission: 'admin',
        })
      ).rejects.toBeInstanceOf(ApiError);
    });
  });

  describe('Delete User', () => {
    it('should delete a user', async () => {
      await userService.deleteUser('1', '2');
      const users = await userService.getUsers();
      expect(users).toHaveLength(1);
    });

    it('colaborators should not be able delete users', () => {
      expect(userService.deleteUser('2', '1')).rejects.toBeInstanceOf(ApiError);
    });

    it('should not found a user', async () => {
      expect(userService.deleteUser('2', '0')).rejects.toBeInstanceOf(ApiError);
    });
  });
});
