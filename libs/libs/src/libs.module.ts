import { Module } from '@nestjs/common';
import { LibsService } from './libs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { appVariables } from 'config';
import { Owner, OwnerSchema } from './database/mongoose/people/owners.shema';

@Module({
  imports: [
    // MongooseModule.forRoot(PEOPLE_DB_URL, PEOPLE_DB),
    MongooseModule.forFeature([
      {
        name: Owner.name,
        schema: OwnerSchema,
      },
    ]),
  ],
  providers: [LibsService],
  exports: [LibsService],
})
export class LibsModule {}
