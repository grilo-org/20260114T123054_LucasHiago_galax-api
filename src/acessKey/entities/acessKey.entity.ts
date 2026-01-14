import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class AccessKey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  key: string;

  @Column()
  isActive: boolean; 

  @Column({ name: 'vinculatedUserId', unique: true })
  vinculatedUserId: number;

  @ManyToOne(() => User, user => user.accessKey)
  @JoinColumn({ name: 'vinculatedUserId' })
  vinculatedUser: User;

  @Column('timestamp')
  expirationDate: Date;
}