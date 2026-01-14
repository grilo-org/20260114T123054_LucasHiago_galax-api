import { ApiProperty } from '@nestjs/swagger';
import { IsString} from 'class-validator';

export class AuthDto {
  @ApiProperty({ description: 'Nome ou e-mail do usuário' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @IsString()
  password: string;
}