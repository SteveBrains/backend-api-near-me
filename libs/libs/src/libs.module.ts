import { Module } from '@nestjs/common';
import { LibsService } from './libs.service';

@Module({
  imports: [],
  providers: [LibsService],
  exports: [LibsService],
})
export class LibsModule { }