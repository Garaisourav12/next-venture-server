import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserType } from '../enum';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string; // definite assignment

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.CUSTOMER,
  })
  userType!: UserType;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
