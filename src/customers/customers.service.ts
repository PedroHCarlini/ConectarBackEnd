import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { resolveSortFilters } from 'src/utils/resolveSortFilters';
import { customersMockForUser } from './mock/customers.mock';

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
      if (customer) throw new BadRequestException('Este cnpj ja esta em uso');
    }

    const customer = this.customersRepository.create({
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.customersRepository.save(customer);
  }

  findAll(params: any, userRole: string) {
    if (userRole === 'user') return customersMockForUser;

    let sortFilter = {};
    if (params.status !== undefined) {
      params.status = params.status === 'true';
    }

    if (params.conectaPlus !== undefined) {
      params.conectaPlus = params.conectaPlus === 'true';
    }

    if (params.sortBy && params.order) {
      sortFilter = resolveSortFilters(params.sortBy, params.order);
      delete params.sortBy;
      delete params.order;
    }

    return this.customersRepository.find({ where: params, order: sortFilter });
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
    if (!customer) throw new BadRequestException('Cliente nao encontrado');
    return this.customersRepository.remove(customer);
  }
}
