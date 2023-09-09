import { User, UserAuthGuard } from '@libs/libs';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  IdentitySignInInputDto,
  IdentitySignUpInputDto,
  IndentityMobileNumberInputDto,
  IndentityVerifyMobileOtpInputDto,
} from '../dto';
import { IdentityService } from '../service';

@Resolver()
export class IdentityResolver {
  constructor(private readonly identityService: IdentityService) {}

  @Query(() => String)
  signIn(@Args('payload') payload: IdentitySignInInputDto) {
    return this.identityService.signInUser(payload);
  }

  @Mutation(() => String)
  signUp(@Args('payload') payload: IdentitySignUpInputDto) {
    return this.identityService.signUpUser(payload);
  }
  @Query(() => String)
  verifyMobileOtp(@Args('payload') payload: IndentityVerifyMobileOtpInputDto) {
    return this.identityService.verifyMobileOtp(payload);
  }
  @Query(() => Boolean)
  mobileNumberSignIn(@Args('payload') payload: IndentityMobileNumberInputDto) {
    return this.identityService.mobileNumberSignIn(payload);
  }
  @UseGuards(UserAuthGuard)
  @Query(() => String)
  hello(@User() user: any) {
    console.log('user ', user);
    return 'hello';
  }
}
