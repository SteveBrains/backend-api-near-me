import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { BaseModel } from "../base.model";

@ObjectType()
@Schema()
export class Owner extends BaseModel {

    @Field(type => String, { nullable: true })
    @Prop({ type: String, required: true })
    firstName: string

    @Field(type => String, { nullable: true })
    @Prop({ type: String, required: true })
    lastName: string

    @Field(type => String, { nullable: true })
    @Prop({ type: String, required: true, unique: true })
    email: string

    @Field(type => String, { nullable: true })
    @Prop({ type: String, required: true })
    mobile: string

}

export type TOwner = Owner & Document;
export const OwnerSchema = SchemaFactory.createForClass(Owner);
