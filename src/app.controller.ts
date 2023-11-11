//  @Get('/')
//   async HelloWorld() {
//     return 'Server is Running';

import { Controller, Get } from '@nestjs/common';

//   }
@Controller('/')
export class HomeController {
  @Get('/')
  async Home() {
    return '<h1>Server is Running<h1/>';
  }
}
