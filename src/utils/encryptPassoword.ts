import { hash } from 'bcrypt';
import { randomInt } from 'node:crypto';

export const encryptPassword = (password: string) => {
  const salt = randomInt(10, 16);
  return hash(password, salt);
};
