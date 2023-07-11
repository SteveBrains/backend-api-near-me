import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { IdentityModule } from './identity/identity.module';
import { BullModule } from '@nestjs/bull';
import { appVariables } from 'config';
import { AuthModule } from './auth';
const { PEOPLE_DB_URL, PEOPLE_DB, IDENTITY_DB, ASSETS_DB, ASSETS_DB_URL, IDENTITY_DB_URL, PEOPLE_DB_CONNECTION, IDENTITY_DB_CONNECTION, ASSETS_DB_CONNECTION } = appVariables
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(PEOPLE_DB_URL, { ...PEOPLE_DB, connectionName: PEOPLE_DB_CONNECTION } as MongooseModuleOptions),
    MongooseModule.forRoot(IDENTITY_DB_URL, { ...IDENTITY_DB, connectionName: IDENTITY_DB_CONNECTION } as MongooseModuleOptions),
    MongooseModule.forRoot(ASSETS_DB_URL, { ...ASSETS_DB, connectionName: ASSETS_DB_CONNECTION } as MongooseModuleOptions),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    IdentityModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule { }
