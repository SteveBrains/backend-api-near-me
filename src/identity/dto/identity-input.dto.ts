import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class IdentitySignInInputDto {
  @Field({ nullable: false })
  profileEmail?: string;

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

  @Field({ nullable: true })
  mobileNumber: string;

  @Field({ nullable: false })
  profileEmail?: string;

  @Field({ nullable: false })
  password: string;

  @Field(() => Boolean, { nullable: false })
  isAdmin?: boolean;
}
