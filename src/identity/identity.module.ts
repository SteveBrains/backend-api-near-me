import { Module } from '@nestjs/common';
import { IdentityResolver } from './identity.resolver';
import { IdentityService } from './identity.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Identity, IdentitySchema } from './schema';
import { ElasticsearchIndexerService } from '@libs/libs/elastic-search/elastic-search-indexer.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { OwnerResolver } from '@libs/libs/resolvers/owner.resolver';
import { IdentityRepo } from './repo/identity.repo';
import { Owner, OwnerSchema } from '@libs/libs/database/mongoose/people/owners.shema';
import { OwnerRepo } from '@libs/libs/repo/owner.repo';
import { appVariables } from 'config';
const { IDENTITY_DB_URL, PEOPLE_DB_URL, PEOPLE_DB, IDENTITY_DB } = appVariables
@Module({
  imports:
    [
      MongooseModule.forRoot(IDENTITY_DB_URL, IDENTITY_DB),
      MongooseModule.forFeature([
        {
          name: Identity.name,
          schema: IdentitySchema,
        },
      ]),
      MongooseModule.forRoot(PEOPLE_DB_URL, PEOPLE_DB),
      MongooseModule.forFeature([
        {
          name: Owner.name,
          schema: OwnerSchema,
        },
      ]),
      ElasticsearchModule.register({
        cloud: {
          id: 'a6c1d4857643429dac3de27792b9c5c4:dXMtZWFzdC0yLmF3cy5lbGFzdGljLWNsb3VkLmNvbTo0NDMkMjgxZmNiNDhjNTg5NDA3MDkyZWI3YzNkMTVhZjY2OTckZTZjNTJlMGNlZmZhNDMwZWFlOTc5OGJiNmQ0NGZkNzA=',
        },
        node: {
          url: new URL(
            'https://e6c52e0ceffa430eae9798bb6d44fd70.us-east-2.aws.elastic-cloud.com:9243',
          ),
          ssl: {
            rejectUnauthorized: true,
          },
        },
        auth: {
          username: 'elastic',
          password: 'Izc4VQmzK4i9xtN0jNRB7UMK',
          // apiKey: 'RzItLTNJZ0IyMkwwbENRN2xycDQ6MlYySUdCeHpUM1NkcndHbExCR29oZw==',
        },
      }),
    ],
  providers: [
    IdentityResolver,
    IdentityService,
    IdentityRepo,
    ElasticsearchIndexerService,
    OwnerResolver,
    OwnerRepo
  ],
})
export class IdentityModule { }

