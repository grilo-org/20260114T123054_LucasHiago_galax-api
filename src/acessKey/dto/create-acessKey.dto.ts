import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive } from "class-validator";

export class CreateAcessKeyDto {
  @ApiProperty({ description: 'Vincula o id do usuário a chave' })
  @IsInt()
  userId: number;

  @ApiProperty({ description: 'Insere o número de dias de expiração da chave' })
  @IsInt()
  @IsPositive()
  expirationDays: number;
}