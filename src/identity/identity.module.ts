import { BcryptHashService } from '@libs/libs/hash';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { IdentityController } from './identity.controller';
import { identityRepos } from './repo';
import { identityResolvers } from './resolver';
import { Identity, IdentitySchema } from './schema';
import { identityServices } from './service';

@Module({
  imports: [
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
    ]),
  ],
  providers: [
    ...identityRepos,
    ...identityServices,
    ...identityResolvers,
    BcryptHashService,
  ],
  exports: [],
  controllers: [IdentityController],
})
export class IdentityModule {}
