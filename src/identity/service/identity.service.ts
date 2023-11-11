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
import { Identity, TIdentity } from '../schema';
import { OrgRepo } from '../repo/org.repo';

@Injectable()
export class IdentityService {
  constructor(
    private readonly identityRepo: IdentityRepo,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptHashService,
    private readonly orgRepo: OrgRepo,
  ) {}

  async signInUser(payload: IdentitySignInInputDto): Promise<string> {
    const { primaryEmail, password } = payload;

    const user = await this.identityRepo.findOne({
      primaryEmail,
    });
    if (!user) {
      throw new NotFoundException('Invalid');
    }
    const hasPasswordValid = await this.bcryptService.compareHash(
      password,
      user.password,
    );
    if (!hasPasswordValid) {
      throw new UnauthorizedException('Invalid');
    }

    const tokenPayload: TUser = {
      _id: user._id,
      primaryEmail: user.primaryEmail,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    const jwtToken = this.encryptInJwt(tokenPayload);
    return jwtToken;
  }

  async signUpUser(payload: IdentitySignUpInputDto): Promise<string> {
    const user = await this.identityRepo.findOne({
      primaryEmail: payload.primaryEmail,
    });

    if (user)
      throw new NotFoundException(
        'User Already Exists with this Email < Not Allowed >',
      );
    const { primaryEmail, password, firstName, lastName } = payload;
    const salt = await this.bcryptService.genrateSalt(10);
    const hashPassword = await this.bcryptService.hashData(password, salt);
    const _id = this.identityRepo.newId();
    const id = await this.identityRepo.create({
      firstName,
      lastName,
      primaryEmail,
      password: hashPassword,
      triggeredBy: _id,
    });
    return this.sendJWT(payload, id);
  }

  async sendJWT(payload: any, id: string): Promise<string> {
    const tokenPayload: TUser = {
      _id: id,
      primaryEmail: payload.primaryEmail,
      firstName: payload.firstName,
      lastName: payload.lastName,
    };
    const jwtToken = this.encryptInJwt(tokenPayload);
    return jwtToken;
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

  async findOneEmail(payload): Promise<boolean> {
    const user = await this.identityRepo.findOne({
      primaryEmail: payload.primaryEmail,
    });
    if (user) return true;
    return false;
  }
  async findOneUser(user): Promise<Identity> {
    const { primaryEmail } = user;
    const fetchUser = await this.identityRepo.findOneWithPopulate(
      {
        primaryEmail,
      },
      'orgs',
    );
    if (!fetchUser)
      throw new NotFoundException('User Does not Exists with this Email');
    return fetchUser;
  }
  async createOrg(payload, user): Promise<boolean> {
    const { primaryEmail, _id } = user;
    const { OrgName, OrgId } = payload;
    const oldUser = await this.identityRepo.findOne({ primaryEmail });
    if (!oldUser) throw new NotFoundException('User Not Found');
    const oldOrg = await this.orgRepo.findOne({ OrgId });

    if (oldOrg) throw new NotFoundException('Already Exist');
    const createdOrg = await this.orgRepo.create({
      OrgName,
      OrgId,
      users: _id,
      adminUsers: _id,
    });

    await this.identityRepo.findOneAndUpdate(
      {
        primaryEmail: primaryEmail,
      },
      {
        orgs: [...oldUser.orgs, createdOrg],
      },
    );
    return true;
  }
  async justCheckOrgIdAvailability(orgId): Promise<boolean> {
    const oldOrg = await this.orgRepo.findOne({ OrgId: orgId });
    if (oldOrg) throw new NotFoundException('Already Exist');
    return false;
  }

  // async verifyMobileOtp(
  //   payload: IndentityVerifyMobileOtpInputDto,
  // ): Promise<string> {
  //   const { mobileNumber, mobileOtp } = payload;

  //   const user = await this.identityRepo.findOne({ mobileNumber });
  //   if (!user) {
  //     throw new NotFoundException(
  //       'User does not Exists with this Phone Number',
  //     );
  //   }
  //   if (user.mobileOTP == mobileOtp) {
  //     console.log(mobileOtp, 'mobileOtp');
  //     await this.identityRepo.updateOne(
  //       { mobileNumber },
  //       {
  //         isMobileVerified: true,
  //       },
  //     );
  //     const tokenPayload: TUser = {
  //       _id: user._id,
  //       primaryEmail: user.primaryEmail,
  //       firstName: user.firstName,
  //       lastName: user.lastName,
  //       mobileNumber: user.mobileNumber,
  //     };
  //     const jwtToken = this.encryptInJwt(tokenPayload);
  //     return jwtToken;
  //   } else {
  //     await this.identityRepo.updateOne(
  //       { mobileNumber },
  //       {
  //         isMobileVerified: false,
  //       },
  //     );
  //   }
  //   return 'false';
  // }

  // async mobileNumberSignIn(
  //   payload: IndentityMobileNumberInputDto,
  // ): Promise<boolean> {
  //   try {
  //     const { mobileNumber } = payload;
  //     const user = await this.identityRepo.findOne({
  //       mobileNumber,
  //     });
  //     console.log(user, 'user---');
  //     const otp = this.sendPhoneOTP();
  //     if (user) {
  //       await this.identityRepo.updateOne(
  //         { mobileNumber },
  //         {
  //           mobileOTP: otp,
  //         },
  //       );
  //     } else {
  //       const _id = this.identityRepo.newId();

  //       const id = await this.identityRepo.create({
  //         ...payload,
  //         mobileOTP: otp,
  //         triggeredBy: _id,
  //       });
  //       console.log(id, 'id------');
  //     }
  //   } catch (error) {
  //     console.log(error, 'error');
  //     return false;
  //   }
  //   return true;
  // }
}
