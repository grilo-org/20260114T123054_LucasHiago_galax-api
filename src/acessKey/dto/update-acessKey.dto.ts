import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate } from "class-validator";

export class UpdateAcessKeyDto {
  @ApiProperty({ description: 'Controlador de chave' })
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ description: 'Atualiza data de expiração'})
  @IsDate()
  expirationDate?: Date;
}