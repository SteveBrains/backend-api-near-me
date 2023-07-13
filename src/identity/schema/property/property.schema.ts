import { Field, ObjectType } from "@nestjs/graphql"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"
import { BaseModel } from "../../../../libs/libs/src/database/mongoose/base.model"
import { PropertyDetails, PropertyDetailsSchema } from "./property-details.schema"
import { PropertyLocationSchema, PropertyLocation } from "./property-location.schema"
import { PropertyRentalDetails, PropertyRentalDetailsSchema } from "./property-rental-details.schema"
import { PropertyResources, PropertyResourcesSchema } from "./property-resources.schema"
import { PropertyGallery, PropertyGallerySchema } from "./property-gallery.schema"
import { PropertyAdditionalInfo, PropertyAdditionalInfoSchema } from "./property-additional-info.schema"

@ObjectType()
@Schema()
export class Property extends BaseModel {

    @Field(type => String)
    @Prop({ type: String, required: true })
    ownerId: string

    @Field(type => PropertyDetails, { nullable: true })
    @Prop({ type: PropertyDetailsSchema })
    propertyDetails: PropertyDetails

    @Field(type => PropertyLocation, { nullable: true })
    @Prop({ type: PropertyLocationSchema })
    locationDetails: PropertyLocation

    @Field(type => PropertyRentalDetails, { nullable: true })
    @Prop({ type: PropertyRentalDetailsSchema })
    rentalDetails: PropertyRentalDetails

    @Field(type => PropertyResources, { nullable: true })
    @Prop({ type: PropertyResourcesSchema })
    propertyResources: PropertyResources

    @Field(type => PropertyGallery, { nullable: true })
    @Prop({ type: PropertyGallerySchema })
    propertyGallery: PropertyGallery

    @Field(type => PropertyAdditionalInfo, { nullable: true })
    @Prop({ type: PropertyAdditionalInfoSchema })
    propertyAdditionalInfo: PropertyAdditionalInfo

}

export type TProperty = Property & Document
export const PropertySchema = SchemaFactory.createForClass(Property)