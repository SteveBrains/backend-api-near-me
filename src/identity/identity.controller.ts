import { Body, Controller, Post } from '@nestjs/common';
import { IdentityService } from './service';

@Controller('/identity')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Post('/verifyJwtToken')
  async verifyToken(@Body() payload: any) {
    // const isValid = await this.identityService.validateXummUser(
    //   payload.accessToken,
    // );
    return true;
  }
}
