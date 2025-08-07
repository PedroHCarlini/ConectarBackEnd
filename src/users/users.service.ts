import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { encryptPassword } from 'src/utils/encryptPassoword';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    if (dto?.email) {
      const user = await this.userRepository.findOneBy({
        email: dto.email,
      });
      if (user) return new BadRequestException('Este email ja esta em uso');
    }

    if (dto?.password) {
      dto.password = await encryptPassword(dto.password);
    }

    const user = this.userRepository.create({
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) return new BadRequestException('Cliente nao encontrado');

    if (dto?.email) {
      const user = await this.userRepository.findOneBy({
        email: dto.email,
      });
      if (user && user.id !== id)
        return new BadRequestException('Este email ja esta em uso');
    }

    if (dto?.password) {
      dto.password = await encryptPassword(dto.password);
    }

    this.userRepository.merge(user, dto);
    return this.userRepository.save(user);
  }

  async delete(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) return null;
    return this.userRepository.remove(user);
  }
}
