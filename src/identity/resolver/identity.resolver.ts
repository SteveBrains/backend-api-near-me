import { User, UserAuthGuard } from '@libs/libs';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  EmailInputDto,
  IdentitySignInInputDto,
  IdentitySignUpInputDto,
  IndentityMobileNumberInputDto,
  IndentityVerifyMobileOtpInputDto,
  UpdateOrgInputDto,
} from '../dto';
import { IdentityService } from '../service';
import { Identity } from '../schema';

@Resolver()
export class IdentityResolver {
  constructor(private readonly identityService: IdentityService) {}

  @UseGuards(UserAuthGuard)
  @Query(() => String)
  hello(@User() user: any) {
    console.log('user ', user);
    return 'hello';
  }
  @Query(() => Boolean)
  findOneEmail(@Args('payload') payload: EmailInputDto) {
    return this.identityService.findOneEmail(payload);
  }
  @Mutation(() => String)
  signUp(@Args('payload') payload: IdentitySignUpInputDto) {
    return this.identityService.signUpUser(payload);
  }

  @Query(() => String)
  signIn(@Args('payload') payload: IdentitySignInInputDto) {
    return this.identityService.signInUser(payload);
  }

  @UseGuards(UserAuthGuard)
  @Query(() => Identity)
  findOneUser(@User() user: any) {
    return this.identityService.findOneUser(user);
  }
  @Mutation(() => Boolean)
  @UseGuards(UserAuthGuard)
  createOrg(@User() user: any, @Args('payload') payload: UpdateOrgInputDto) {
    return this.identityService.createOrg(payload, user);
  }
  @UseGuards(UserAuthGuard)
  @Query(() => Boolean)
  justOrgIdAvailability(@Args('orgId') orgId: string) {
    return this.identityService.justCheckOrgIdAvailability(orgId);
  }
}

// @Query(() => String)
// verifyMobileOtp(@Args('payload') payload: IndentityVerifyMobileOtpInputDto) {
//   return this.identityService.verifyMobileOtp(payload);
// }
// @Query(() => Boolean)
// mobileNumberSignIn(@Args('payload') payload: IndentityMobileNumberInputDto) {
//   return this.identityService.mobileNumberSignIn(payload);
// }
