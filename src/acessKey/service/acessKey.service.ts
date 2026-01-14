import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AccessKey } from "../entities/acessKey.entity";
import { randomBytes } from "crypto";
import * as bcrypt from 'bcryptjs';
import { User } from "src/users/entities/user.entity";
import { IAcessKeyService } from '../interfaces/acessKey.interface';
import { CreateAcessKeyDto } from '../dto/create-acessKey.dto';
import { UpdateAcessKeyDto } from '../dto/update-acessKey.dto';


@Injectable()
export class AccessKeyService implements IAcessKeyService {
  constructor(
    @InjectRepository(AccessKey)
    private readonly accessKeyRepository: Repository<AccessKey>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}

  async validateKey(key: string): Promise<boolean> {
    const accessKey = await this.accessKeyRepository.findOne({
      where: { key, isActive: true },
    });

    return !!accessKey;
  }

  async createKey(createAcessKeyDto: CreateAcessKeyDto): Promise<AccessKey> {
    const { expirationDays, userId } = createAcessKeyDto;

    if(await this.vinculateAccessKeyToUser(userId)) throw new UnauthorizedException('This user already has an active key.');

    const  expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);

    const accessKey = this.accessKeyRepository.create({
      key: await this.generateUniqueKey(),
      vinculatedUserId: userId,
      isActive: true,
      expirationDate
    })

    await this.accessKeyRepository.save(accessKey);
    return accessKey;
  }

  async useAccessKey(userId: number, key: string): Promise<void> {
    const accessKey = await this.accessKeyRepository.findOne({
      where: { key },
      relations: ['vinculatedUser'],
    });

    if (!accessKey) 
      throw new UnauthorizedException('Access Key is invalid.');

    if (accessKey.vinculatedUserId !== userId) 
      throw new UnauthorizedException('Access does not belong to the user.');

    const currentDate = new Date();
    if(accessKey.expirationDate < currentDate) 
      throw new UnauthorizedException('Acess key has expired');

    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });

    if (!user) 
      throw new UnauthorizedException('User not found.');
    // if (!user.role.includes('')) {
    //   throw new UnauthorizedException('User does not have permission to use the Access Key.');
    // }
  }

  async updateKey(id: number, updateAcessKeyDto: UpdateAcessKeyDto): Promise<AccessKey> {
    const accessKey = await this.accessKeyRepository.findOne({
      where: { id }
    });

    if(!accessKey) throw new NotFoundException(`Access key with ID ${id} not found`);

    const updateAccesKeyDto = await this.accessKeyRepository.save({
      ...accessKey,
      ...updateAcessKeyDto
    });
  
    return updateAccesKeyDto;
  }

  async deleteKey(id: number): Promise<void> {
    const result = await this.accessKeyRepository.delete(id);
    if(result.affected === 0) throw new NotFoundException(`Access key with ID ${id} not found`);
  }

  private async generateUniqueKey(): Promise<string> {
    const parts = [randomBytes(2), randomBytes(2), randomBytes(2)];
    const key = this.formatKey(parts);

    const salt = await bcrypt.genSalt();
    const hashedKey = await bcrypt.hash(key, salt);

    return hashedKey;
  }

  private formatKey(parts: Buffer[]): string {
    return parts.map(part => part.toString('hex')).join('-').toUpperCase();
  }

  private async vinculateAccessKeyToUser(userId: number): Promise<boolean> {
    const existingAccessKey = await this.accessKeyRepository.findOne({
      where: { vinculatedUserId: userId, isActive: true }
    });

    if(existingAccessKey) return true;

    return false;
  }
}