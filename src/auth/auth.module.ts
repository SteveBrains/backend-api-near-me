import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';
import { ConfigModule } from '@nestjs/config';
import { GlobalService } from '@libs/libs';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    PassportModule.register({
      defaultStrategy: GlobalService.appName,
    }),
    JwtModule.register({
      secret: process.env.APP_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [
    JwtStrategy,
    AuthService,
    {
      provide: 'AUTH_GUARD_JWT',
      useValue: GlobalService.appName,
    },
  ],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule { }
