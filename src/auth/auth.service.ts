import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}
  async validateIdentityUser(accessToken: string) {
    try {
      const data = await this.httpService
        .post('http://localhost:4000/identity/verifyJwtToken', {
          accessToken: accessToken,
        })
        .toPromise();
      return data.data ? true : false;
    } catch (error) {
      console.log('Error ', error);
    }
    return true;
  }
}
