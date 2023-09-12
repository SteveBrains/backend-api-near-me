import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationSchema, Search, SearchSchema, Location } from './schema';
import { SearchService } from './service';
import { SearchRepo } from './repo';
import { SearchResolver } from './resolver';
import { BullModule } from '@nestjs/bull';
import { SearchIngress } from './ingress';
import { appVariables } from 'config';
const { MONGO_DB_URL, LOCATION_DB } = appVariables;

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Search.name,
        schema: SearchSchema,
      },
      {
        name: Location.name,
        schema: LocationSchema,
      },
    ]),
    MongooseModule.forRoot(MONGO_DB_URL, LOCATION_DB), // default connection

    BullModule.registerQueue({
      name: 'Search',
    }),
  ],
  providers: [SearchService, SearchRepo, SearchResolver, SearchIngress],
})
export class SearchModule {}
