import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Org, TOrg } from '../schema';
import { type } from 'os';
import { Types } from 'mongoose';

@InputType()
export class IdentitySignInInputDto {
  @Field({ nullable: false })
  primaryEmail?: string;

  @Field({ nullable: false })
  password: string;
}

@InputType()
export class IdentitySignUpInputDto {
  @Field(() => Boolean, { nullable: true })
  isProfileCompleted?: boolean;

  @Field({ nullable: true })
  picture?: string;

  @Field({ nullable: false })
  firstName?: string;

  @Field({ nullable: false })
  lastName?: string;

  @Field({ nullable: false })
  primaryEmail?: string;

  @Field({ nullable: false })
  password: string;

  @Field(() => Boolean, { nullable: true })
  isAdmin?: boolean;
}
@InputType()
export class IndentityVerifyMobileOtpInputDto {
  @Field(() => String, { nullable: false })
  mobileNumber: string;

  @Field(() => String, { nullable: false })
  mobileOtp: string;
}
@InputType()
export class IndentityMobileNumberInputDto {
  @Field(() => String, { nullable: false })
  mobileNumber: string;
}

@InputType()
export class EmailInputDto {
  @Field(() => String, { nullable: false })
  primaryEmail: string;
}

@InputType()
export class UpdateOrgInputDto {
  @Field(() => String, { nullable: false })
  OrgName: string;
  @Field(() => String)
  OrgId: string;
}
