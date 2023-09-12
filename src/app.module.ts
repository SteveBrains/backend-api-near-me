import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { IdentityModule } from './identity/identity.module';
import { BullModule } from '@nestjs/bull';
import { appVariables } from 'config';
import { AuthModule } from './auth';
const { PEOPLE_DB, PEOPLE_DB_URL, MONGO_DB_URL, LOCATION_DB } = appVariables;
import { SearchModule } from './search';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(MONGO_DB_URL, PEOPLE_DB), // default connection
    MongooseModule.forRoot(MONGO_DB_URL, LOCATION_DB), // default connection

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      introspection: true,
      playground: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),

    IdentityModule,
    AuthModule,
    SearchModule,
  ],
  controllers: [],
  providers: [AppService, AppResolver],
})
export class AppModule {}
