import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customersRepository: Repository<Customer>,
  ) {}

  async create(dto: CreateCustomerDto) {
    if (dto?.cnpj) {
      const customer = await this.customersRepository.findOneBy({
        cnpj: dto.cnpj,
      });
      if (customer) return new BadRequestException('Este cnpj ja esta em uso');
    }

    const customer = this.customersRepository.create({
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.customersRepository.save(customer);
  }

  findAll() {
    return this.customersRepository.find();
  }

  findOne(id: string) {
    return this.customersRepository.findOneBy({ id });
  }

  async update(id: string, dto: UpdateCustomerDto) {
    const customer = await this.customersRepository.findOneBy({ id });
    if (!customer) throw new BadRequestException('Cliente nao encontrado');

    if (dto?.cnpj) {
      const customer = await this.customersRepository.findOneBy({
        cnpj: dto.cnpj,
      });
      if (customer && customer.id !== id)
        throw new BadRequestException(
          'Este cnpj ja esta em uso em outro cliente',
        );
    }

    this.customersRepository.merge(customer, dto);
    return this.customersRepository.save(customer);
  }

  async delete(id: string) {
    const customer = await this.customersRepository.findOneBy({ id });
    if (!customer) return null;
    return this.customersRepository.remove(customer);
  }
}
