import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";

export interface IUsersService {
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User>;
  findUser(action: string): Promise<User>;
  create(user: CreateUserDto): Promise<User>;
  update(id: number, user: UpdateUserDto): Promise<User>;
  delete(id: number): Promise<void>;
}