import { BaseModel, IBaseModel } from '@libs/libs';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Identity } from './identity.schema';
import { Document } from 'mongoose';
@ObjectType()
@Schema({
  timestamps: true,
})
export class Org extends BaseModel implements IBaseModel {
  @Field(() => String, { nullable: false })
  @Prop({ type: String })
  OrgName: string;

  @Field(() => String, { nullable: false })
  @Prop({ type: String, unique: true })
  OrgId: string;

  @Field(() => [Identity])
  @Prop({ type: [Types.ObjectId], ref: 'Identity' })
  users: Identity[];

  @Field(() => [Identity])
  @Prop({ type: [Types.ObjectId], ref: 'Identity' })
  adminUsers: Identity[];
}

export type TOrg = Org & Document;
export const OrgSchema = SchemaFactory.createForClass(Org);
