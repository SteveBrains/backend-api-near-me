import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { IdentityModule } from './identity/identity.module';
import { BullModule } from '@nestjs/bull';
import { appVariables } from 'config';
const { PEOPLE_DB } = appVariables
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot("mongodb+srv://stevebrains:wCYSfSy6M5dwA0J2@stevebrains.zzow6rn.mongodb.net", PEOPLE_DB), // default connection

    // ElasticsearchModule.register({
    //   node: 'https://e6c52e0ceffa430eae9798bb6d44fd70.us-east-2.aws.elastic-cloud.com:9243',
    //   auth: {
    //     apiKey: 'RzItLTNJZ0IyMkwwbENRN2xycDQ6MlYySUdCeHpUM1NkcndHbExCR29oZw==',
    //   },
    // }),
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
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule { }
