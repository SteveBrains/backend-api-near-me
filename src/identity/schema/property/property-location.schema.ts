import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@ObjectType()
@Schema()
export class PropertyLocation {

    @Field(type => String, { nullable: true })
    @Prop({ type: String })
    country: string

    @Field(type => String, { nullable: true })
    @Prop({ type: String })
    city: string

    @Field(type => [Number], { nullable: true })
    @Prop({ type: [Number] })
    location: number[]   // [ lat, long ]

    @Field(type => String, { nullable: true })
    @Prop({ type: String })
    street: string

    @Field(type => String, { nullable: true })
    @Prop({ type: String })
    landMark: string

}

export type TPropertyLocation = PropertyLocation & Document
export const PropertyLocationSchema = SchemaFactory.createForClass(PropertyLocation)
