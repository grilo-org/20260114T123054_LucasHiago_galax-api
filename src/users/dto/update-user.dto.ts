import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsPhoneNumber, IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserRole } from './role-user.enum';

export class UpdateUserDto {
  @ApiProperty({ description: 'Nome do usuário', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Endereço de e-mail', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'Senha do usuário', required: false })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ description: 'Número de contato do usuário', required: false })
  @IsPhoneNumber(null)
  @IsOptional()
  @Transform(({ value }) => value.replace(/[^\d+]/g, ''))
  contact_number?: string;

  @ApiProperty({ description: 'Endereço residencial do usuário', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ enum: UserRole, description: 'Permissão do usuário', required: false })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}