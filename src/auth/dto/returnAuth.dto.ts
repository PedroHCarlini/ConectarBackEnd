import { User } from 'src/users/entities/user.entity';

export interface ReturnAuthenticateDto {
  accessToken: string;
  user: User;
}
