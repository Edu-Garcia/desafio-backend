import { Column, Entity } from 'typeorm';
import Base from './Base.Entity';

@Entity('users')
export default class User extends Base {
  @Column()
  public name: string;

  @Column()
  public password: string;

  @Column()
  public birth_date: Date;

  @Column()
  public cpf: string;

  @Column()
  public observations?: string;

  @Column()
  public permission: string;
}
