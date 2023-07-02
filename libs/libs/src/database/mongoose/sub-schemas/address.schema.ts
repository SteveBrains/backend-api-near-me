import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class Address {

    @Field(type => String, { nullable: true })
    @Prop({ type: String, required: true })
    country: string

    @Field(type => String, { nullable: true })
    @Prop({ type: String, required: true })
    city: string

    @Field(type => String, { nullable: true })
    @Prop({ type: String, required: true })
    street: string

}

export type TAddress = Address & Document
export const AddressSchema = SchemaFactory.createForClass(Address)