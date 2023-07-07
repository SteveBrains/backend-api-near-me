import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IdentityRepo } from '../repo';
import { JwtService } from '@nestjs/jwt';
import { TUser } from '@libs/libs';
import { IdentitySignInInputDto, IdentitySignUpInputDto } from '../dto';
import { BcryptHashService } from '@libs/libs/hash';

@Injectable()
export class IdentityService {
  constructor(
    private readonly identityRepo: IdentityRepo,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptHashService,
  ) {}

  async signInUser(payload: IdentitySignInInputDto): Promise<string> {
    const { profileEmail, password } = payload;

    const user = await this.identityRepo.findOne({
      profileEmail,
    });
    if (!user) {
      throw new NotFoundException('Email Not Found');
    }
    const hasPasswordValid = await this.bcryptService.compareHash(
      password,
      user.password,
    );
    if (!hasPasswordValid) {
      throw new UnauthorizedException('Password Not Match');
    }

    const tokenPayload: TUser = {
      _id: user._id,
      profileEmail: user.profileEmail,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    const jwtToken = this.encryptInJwt(tokenPayload);

    //TODO: Add Events To Trigger Notification

    return jwtToken;
  }

  async signUpUser(payload: IdentitySignUpInputDto): Promise<boolean> {
    const _id = this.identityRepo.newId();
    const { password } = payload;
    const salt = await this.bcryptService.genrateSalt(10);
    const hashPassword = await this.bcryptService.hashData(password, salt);
    await this.identityRepo.create({
      ...payload,
      password: hashPassword,
      triggeredBy: _id,
    });
    return true;
  }

  encryptInJwt(payload: TUser): string {
    return this.jwtService.sign(payload);
  }
}
