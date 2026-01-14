import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsEmail, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

class IdentificationDto {
  @ApiProperty({
    description: 'Tipo de identificação do pagador',
    example: 'CPF'
  })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Número de identificação do pagador',
    example: '12345678900'
  })
  @IsNotEmpty()
  @IsString()
  number: string;
}

class PayerDto {
  @ApiProperty({
    description: 'Email do pagador',
    example: 'email@exemplo.com'
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Identificação do pagador',
    type: IdentificationDto
  })
  @ValidateNested()
  @Type(() => IdentificationDto)
  @IsNotEmpty()
  identification: IdentificationDto;
}

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Montante da transação',
    example: 100.50
  })
  @IsNotEmpty()
  @IsNumber()
  transaction_amount: number;

  @ApiProperty({
    description: 'Token de pagamento',
    example: 'token123'
  })
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty({
    description: 'Descrição da transação',
    example: 'Donate'
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Número de parcelas',
    example: 3
  })
  @IsNotEmpty()
  @IsNumber()
  installments: number;

  @ApiProperty({
    description: 'Método de pagamento',
    example: 'credit_card'
  })
  @IsNotEmpty()
  @IsString()
  payment_method_id: string;

  @ApiProperty({
    description: 'ID do emissor',
    example: 'issuer123'
  })
  @IsNotEmpty()
  @IsString()
  issuer_id: string;

  @ApiProperty({
    description: 'Informações do pagador',
    type: PayerDto
  })
  @ValidateNested()
  @Type(() => PayerDto)
  @IsNotEmpty()
  payer: PayerDto;
}