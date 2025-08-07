import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @IsString()
  @IsOptional()
  customerName: string;

  @IsString()
  @IsOptional()
  cnpj: string;

  @IsString()
  @IsOptional()
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
