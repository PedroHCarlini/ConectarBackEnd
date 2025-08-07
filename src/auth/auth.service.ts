import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/authenticate.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly jwtService: JwtService,
  ) {}

  async authenticateUser(authDto: AuthDto): Promise<any> {
    //verify if user exists
    const user = await this.customerRepository.findOneBy({
      email: authDto.email,
    });

    if (!user) return new UnauthorizedException('Email ou senha inválidos');

    //verify if password is correct
    const isPasswordvalid = compare(authDto.password, user.password);

    if (!isPasswordvalid)
      return new UnauthorizedException('Email ou senha inválidos');

    return {
      accessToken: this.jwtService.sign({
        sub: user.id,
        username: user.name,
        email: user.email,
        role: user.role,
      }),
      user,
    };
  }
}
