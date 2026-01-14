import { AccessKey } from "../entities/acessKey.entity";
import { CreateAcessKeyDto } from '../dto/create-acessKey.dto';
import { UpdateAcessKeyDto } from '../dto/update-acessKey.dto';

export interface IAcessKeyService {
  validateKey(key: string): Promise<boolean>;
  createKey(createAcessKeyDto: CreateAcessKeyDto): Promise<AccessKey>;
  updateKey(id: number, updateAcessKeyDto: UpdateAcessKeyDto): Promise<AccessKey>;
  useAccessKey(userId: number, key: string): Promise<void>;
  deleteKey(id: number): Promise<void>;
}