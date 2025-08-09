import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async authenticateUser(authDto: AuthDto): Promise<any> {
    const user = await this.userRepository.findOneBy({
      email: authDto.email,
    });

    if (!user) throw new UnauthorizedException('Email ou senha inválidos');

    const isPasswordvalid = compare(authDto.password, user.password);

    if (!isPasswordvalid)
      throw new UnauthorizedException('Email ou senha inválidos');

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
