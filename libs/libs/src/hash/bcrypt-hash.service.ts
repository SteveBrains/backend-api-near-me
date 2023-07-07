import { Injectable } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcryptjs';

@Injectable()
export class BcryptHashService {
  async genrateSalt(rounds: number): Promise<string> {
    return await genSalt(rounds);
  }

  async hashData(data: string, salt: string | number): Promise<string> {
    return await hash(data, salt);
  }

  async compareHash(data: string, encrypted: string): Promise<boolean> {
    return compare(data, encrypted);
  }
}
