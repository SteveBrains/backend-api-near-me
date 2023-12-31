import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IdentityRepo } from '../repo';
import { JwtService } from '@nestjs/jwt';
import { TUser } from '@libs/libs';
import {
  IdentitySignInInputDto,
  IdentitySignUpInputDto,
  IndentityMobileNumberInputDto,
  IndentityVerifyMobileOtpInputDto,
} from '../dto';
import { BcryptHashService } from '@libs/libs/hash';
import { TIdentity } from '../schema';

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

  async signUpUser(payload: IdentitySignUpInputDto): Promise<string> {
    const user = await this.identityRepo.findOne({
      profileEmail: payload.profileEmail,
    });
    const { password, mobileNumber } = payload;
    const salt = await this.bcryptService.genrateSalt(10);
    const hashPassword = await this.bcryptService.hashData(password, salt);
    if (user)
      throw new NotFoundException('User Already Exists with this Email');
    const userBasedPhoneNumber = await this.identityRepo.findOne({
      mobileNumber,
    });
    if (userBasedPhoneNumber) {
      if (!userBasedPhoneNumber.profileEmail) {
        await this.identityRepo.updateOne(
          {
            _id: userBasedPhoneNumber._id,
          },
          {
            ...payload,
            password: hashPassword,
          },
        );

        return this.sendJWT(payload, userBasedPhoneNumber._id);
      } else {
        throw new NotFoundException(
          'User Already Exists with this Phone Number',
        );
      }
    } else {
      const _id = this.identityRepo.newId();
      const id = await this.identityRepo.create({
        ...payload,
        password: hashPassword,
        triggeredBy: _id,
      });
      return this.sendJWT(payload, id);
    }
  }

  async sendJWT(payload: any, id: string): Promise<string> {
    const tokenPayload: TUser = {
      _id: id,
      profileEmail: payload.profileEmail,
      firstName: payload.firstName,
      lastName: payload.lastName,
    };
    const jwtToken = this.encryptInJwt(tokenPayload);
    return jwtToken;
  }

  async verifyMobileOtp(
    payload: IndentityVerifyMobileOtpInputDto,
  ): Promise<string> {
    const { mobileNumber, mobileOtp } = payload;

    const user = await this.identityRepo.findOne({ mobileNumber });
    if (!user) {
      throw new NotFoundException(
        'User does not Exists with this Phone Number',
      );
    }
    if (user.mobileOTP == mobileOtp) {
      console.log(mobileOtp, 'mobileOtp');
      await this.identityRepo.updateOne(
        { mobileNumber },
        {
          isMobileVerified: true,
        },
      );
      const tokenPayload: TUser = {
        _id: user._id,
        profileEmail: user.profileEmail,
        firstName: user.firstName,
        lastName: user.lastName,
        mobileNumber: user.mobileNumber,
      };
      const jwtToken = this.encryptInJwt(tokenPayload);
      return jwtToken;
    } else {
      await this.identityRepo.updateOne(
        { mobileNumber },
        {
          isMobileVerified: false,
        },
      );
    }
    return 'false';
  }

  async mobileNumberSignIn(
    payload: IndentityMobileNumberInputDto,
  ): Promise<boolean> {
    try {
      const { mobileNumber } = payload;
      const user = await this.identityRepo.findOne({
        mobileNumber,
      });
      console.log(user, 'user---');
      const otp = this.sendPhoneOTP();
      if (user) {
        await this.identityRepo.updateOne(
          { mobileNumber },
          {
            mobileOTP: otp,
          },
        );
      } else {
        const _id = this.identityRepo.newId();

        const id = await this.identityRepo.create({
          ...payload,
          mobileOTP: otp,
          triggeredBy: _id,
        });
        console.log(id, 'id------');
      }
    } catch (error) {
      console.log(error, 'error');
      return false;
    }
    return true;
  }
  encryptInJwt(payload: TUser): string {
    return this.jwtService.sign(payload);
  }
  sendPhoneOTP(): string {
    console.log('TODO ================ SENT OTP', this.generateRandomNumber());
    return this.generateRandomNumber();
  }
  generateRandomNumber(): string {
    return '111111';
  }
}
