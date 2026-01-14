import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserRole } from '../dto/role-user.enum';
import { AccessKey } from 'src/acessKey/entities/acessKey.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; 

  @Column()
  contact_number: string;

  @Column()
  address: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @OneToMany(() => AccessKey, accessKey => accessKey.vinculatedUser)
  accessKey: AccessKey;
}