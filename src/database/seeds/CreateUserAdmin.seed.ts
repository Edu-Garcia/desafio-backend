import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { hash } from 'bcrypt';
import User from '../entities/User.Entity';
import config from '../../config/config';

export default class CreateUserAdmin implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<any> {
    const rows = await connection.getRepository(User).count();
    if (rows <= 0) {
      const hashedPassword = await hash('admin', config.saltWorkFactor);
      await connection
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            name: 'Admin',
            password: hashedPassword,
            birth_date: new Date(),
            cpf: '00000000000',
            permission: 'admin',
          },
        ])
        .execute();
    }
  }
}
