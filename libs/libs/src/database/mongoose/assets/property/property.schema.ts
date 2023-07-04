import { Field, ObjectType } from "@nestjs/graphql"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"
import { BaseModel } from "../../base.model"
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

    @Field(type => PropertyDetails)
    @Prop({ type: PropertyDetailsSchema, required: true })
    propertyDetails: PropertyDetails

    @Field(type => PropertyLocation)
    @Prop({ type: PropertyLocationSchema, required: true })
    locationDetails: PropertyLocation

    @Field(type => PropertyRentalDetails)
    @Prop({ type: PropertyRentalDetailsSchema, required: true })
    rentalDetails: PropertyRentalDetails

    @Field(type => PropertyResources)
    @Prop({ type: PropertyResourcesSchema, required: true })
    propertyResources: PropertyResources

    @Field(type => PropertyGallery)
    @Prop({ type: PropertyGallerySchema, required: true })
    propertyGallery: PropertyGallery

    @Field(type => PropertyAdditionalInfo)
    @Prop({ type: PropertyAdditionalInfoSchema, required: true })
    propertyAdditionalInfo: PropertyAdditionalInfo

}

export type TProperty = Property & Document
export const PropertySchema = SchemaFactory.createForClass(Property)