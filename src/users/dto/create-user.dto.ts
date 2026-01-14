import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsPhoneNumber, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserRole } from './role-user.enum'; 

export class CreateUserDto {
  @ApiProperty({ description: 'Nome do usuário' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Endereço de e-mail' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'Número de contato do usuário' })
  @IsPhoneNumber(null)
  @Transform(({ value }) => value.replace(/[^\d+]/g, ''))
  contact_number: string;

  @ApiProperty({ description: 'Endereço residencial do usuário' })
  @IsString()
  address: string;

  @ApiProperty({ enum: UserRole, description: 'Permissão do usuário' })
  @IsEnum(UserRole)
  role: UserRole;
}