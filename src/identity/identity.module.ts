import { BcryptHashService } from '@libs/libs/hash';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { IdentityController } from './identity.controller';
import { identityRepos } from './repo';
import { identityResolvers } from './resolver';
import { Identity, IdentitySchema } from './schema';
import { ElasticsearchIndexerService } from '@libs/libs/elastic-search/elastic-search-indexer.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { OwnerResolver } from 'src/identity/resolver/owner.resolver';
import { IdentityRepo } from './repo/identity.repo';
import { Owner, OwnerSchema } from 'src/identity/schema/owners.shema';
import { OwnerRepo } from 'src/identity/repo/owner.repo';
import { appVariables } from 'config';
import { PropertyResolver } from 'src/identity/resolver/property.resolver';
import { PropertyRepo } from 'src/identity/repo/property.repo';
import { Property, PropertySchema } from 'src/identity/schema/property/property.schema';
import { identityServices } from './service';
const { PEOPLE_DB_CONNECTION, IDENTITY_DB_CONNECTION, ASSETS_DB_CONNECTION, ELASTIC_CLOUD_ID, ELASTIC_NODE_URL, ELASTIC_AUTH_USER_NAME, ELATIC_AUTH_USER_PASSWORD } = appVariables

@Module({
  imports:
    [
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      JwtModule.register({
        secret: process.env.APP_SECRET,
        signOptions: {
          expiresIn: '7d',
        },
      }),
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
    ...identityRepos,
    ...identityServices,
    ...identityResolvers,
    BcryptHashService,
    IdentityRepo,
    ElasticsearchIndexerService,
    OwnerResolver,
    OwnerRepo,
    PropertyResolver,
    PropertyRepo
  ],
  controllers: [IdentityController],

})
export class IdentityModule { }

