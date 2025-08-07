import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  customerName: string;

  @IsString()
  cnpj: string;

  @IsString()
  legalName: string;

  @IsBoolean()
  @IsOptional()
  conectaPlus: boolean;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags: string[];
}
