import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { Repository } from 'typeorm';
import { AuthenticateDto } from './dto/authenticate.dto';
import { compare } from 'bcrypt';
import { access } from 'fs';
import { ReturnAuthenticateDto } from './dto/returnAuthenticate.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticateService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly jwtService: JwtService,
  ) {}

  async authenticateUser(authenticateDto: AuthenticateDto): Promise<any> {
    //verify if user exists
    const user = await this.customerRepository.findOneBy({
      email: authenticateDto.email,
    });

    if (!user) return null;

    //verify if password is correct

    const isPasswordvalid = compare(authenticateDto.password, user.password);

    return {
      accessToken: this.jwtService.sign({
        id: user.id,
        email: user.email,
        role: user.role,
      }),
      user,
    };
  }
}
