import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { IUser } from '../../models/user.model';
import Base from './Base.Entity';

@Entity('users')
export default class User extends Base implements IUser {
  @Column()
  public name: string;

  @Column()
  @Exclude()
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
