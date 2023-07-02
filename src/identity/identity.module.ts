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
import { PropertyResolver } from '@libs/libs/resolvers/property.resolver';
import { PropertyRepo } from '@libs/libs/repo/property.repo';
import { Property, PropertySchema } from '@libs/libs/database/mongoose/assets/property.schema';
const { PEOPLE_DB_CONNECTION, IDENTITY_DB_CONNECTION, ASSETS_DB_CONNECTION, ELASTIC_CLOUD_ID, ELASTIC_NODE_URL, ELASTIC_AUTH_USER_NAME, ELATIC_AUTH_USER_PASSWORD } = appVariables

@Module({
  imports:
    [
      MongooseModule.forFeature([
        {
          name: Identity.name,
          schema: IdentitySchema,
        },
      ], IDENTITY_DB_CONNECTION),

      MongooseModule.forFeature([
        {
          name: Owner.name,
          schema: OwnerSchema,
        },
      ], PEOPLE_DB_CONNECTION),

      MongooseModule.forFeature([
        {
          name: Property.name,
          schema: PropertySchema,
        },
      ], ASSETS_DB_CONNECTION),

      ElasticsearchModule.register({
        cloud: {
          id: ELASTIC_CLOUD_ID,
        },
        node: {
          url: new URL(
            ELASTIC_NODE_URL,
          ),
          ssl: {
            rejectUnauthorized: true,
          },
        },
        auth: {
          username: ELASTIC_AUTH_USER_NAME,
          password: ELATIC_AUTH_USER_PASSWORD,
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
    OwnerRepo,
    PropertyResolver,
    PropertyRepo
  ],
})
export class IdentityModule { }

