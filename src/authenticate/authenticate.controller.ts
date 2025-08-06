import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';
import { AuthenticateDto } from './dto/authenticate.dto';

@Controller('authenticate')
export class AuthenticateController {
  constructor(private readonly authenticateService: AuthenticateService) {}

  @Post()
  create(@Body() authenticateDto: AuthenticateDto) {
    return this.authenticateService.authenticateUser(authenticateDto);
  }
}
