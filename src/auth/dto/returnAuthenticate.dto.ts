import { Customer } from 'src/customers/entities/customer.entity';

export interface ReturnAuthenticateDto {
  accessToken: string;
  user: Customer;
}
