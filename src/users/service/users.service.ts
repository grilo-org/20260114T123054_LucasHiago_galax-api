import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword
    });
    
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { user_id: id }
    });

    if (!user) throw new NotFoundException(`User with ID "${id}" not found`);

    return user;
  }

  async findUser(action: string): Promise<User> {
    const user: any = await this.userRepository.createQueryBuilder('user')
      .where('user.name = :action OR user.email = :action', { action })
      .getOne();

    if(!user) throw new NotFoundException(`User not found: ${action}`);
    
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload({
      user_id: id,
      ...updateUserDto,
    });

    if (!user) throw new NotFoundException(`User with ID "${id}" not found`);
    
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    this.userRepository.remove(user);
  }
}
