import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@ObjectType()
@Schema()
export class PropertyGallery {

    // strore urls of photos and videos and load on demand while opening property detail

    @Field(type => [String], { nullable: true })
    @Prop({ type: [String] })
    photos: string[]

    @Field(type => [String], { nullable: true })
    @Prop({ type: [String] })
    videos: string[]


}
export type TPropertyGallery = PropertyGallery & Document
export const PropertyGallerySchema = SchemaFactory.createForClass(PropertyGallery)