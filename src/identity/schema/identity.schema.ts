import { BaseModel, IBaseModel } from '@libs/libs';
import { Field, HideField, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { types } from 'util';
import { Org } from './org.schema';

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

  @Field({ nullable: false })
  @Prop({
    nullable: false,
    sparse: true,
    length: 300,
    lowercase: true,
    trim: true,
    index: true,
    require: true,
  })
  primaryEmail: string;

  @Field({ nullable: true })
  @Prop()
  firstName: string;

  @Field({ nullable: true })
  @Prop()
  lastName: string;

  @HideField()
  @Prop()
  password: string;

  @Field(() => [Org])
  @Prop({ type: [Types.ObjectId], ref: 'Org' })
  orgs: Org[];
}

export type TIdentity = Identity & Document;
export const IdentitySchema = SchemaFactory.createForClass(Identity);
