import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './dto/authenticate.dto';
import { AuthService } from './auth.service';

@Controller('authenticate')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() authDto: AuthDto) {
    return this.authService.authenticateUser(authDto);
  }
}
