import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  create(dto: CreateCustomerDto) {
    const customer = this.customerRepository.create({
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.customerRepository.save(customer);
  }

  findAll() {
    return this.customerRepository.find();
  }

  findOne(id: string) {
    return this.customerRepository.findOneBy({ id });
  }

  async update(id: string, dto: UpdateCustomerDto) {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) return null;
    this.customerRepository.merge(customer, dto);
    return this.customerRepository.save(customer);
  }

  async delete(id: string) {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) return null;
    return this.customerRepository.remove(customer);
  }
}
