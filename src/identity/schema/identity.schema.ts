import { BaseModel, IBaseModel } from '@libs/libs';
import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema({
  timestamps: true,
})
export class Identity extends BaseModel implements IBaseModel {
  @Field(() => Boolean, { nullable: true })
  @Prop({ type: Boolean, default: false })
  isAdmin: boolean;

  @Field(() => Boolean, { nullable: true })
  @Prop({ type: Boolean, default: false })
  isProfileCompleted: boolean;

  @Field({ nullable: true })
  @Prop({ unique: true, length: 300, lowercase: true, trim: true, index: true })
  profileEmail: string;

  @Field({ nullable: true })
  @Prop({ unique: true })
  mobileNumber: string;

  @Field({ nullable: true })
  @Prop()
  firstName: string;

  @Field({ nullable: true })
  @Prop()
  lastName: string;

  @HideField()
  @Prop()
  password: string;
}

export type TIdentity = Identity & Document;
export const IdentitySchema = SchemaFactory.createForClass(Identity);
