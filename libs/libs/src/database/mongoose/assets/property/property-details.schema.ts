import { BuildingTypeEnum, FurnishingTypeEnum, ProperTypeEnum, PropertyAgeEnum, TenantsTypeEnum } from "@libs/libs/constants/enums/properties.enum"
import { Field, ObjectType } from "@nestjs/graphql"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from 'mongoose'

@ObjectType()
@Schema()
export class PropertyDetails {

    @Field(type => ProperTypeEnum)
    @Prop({ type: String, required: true })
    propertyType: ProperTypeEnum

    @Field(type => BuildingTypeEnum)
    @Prop({ type: String, required: true })
    buildingType: BuildingTypeEnum

    @Field(type => PropertyAgeEnum, { nullable: true })
    @Prop({ type: String })
    propertyAge: PropertyAgeEnum

    @Field(type => String, { nullable: true })
    @Prop({ type: String })
    floor: string

    @Field(type => Number, { nullable: true })
    @Prop({ type: Number })
    totalFloors: number

    @Field(type => FurnishingTypeEnum)
    @Prop({ type: String, required: true })
    furnishingType: FurnishingTypeEnum

    @Field(type => [String])
    @Prop({ type: [String], required: true })
    furnishedThings: string[]

    @Field(type => TenantsTypeEnum)
    @Prop({ type: String, required: true })
    preferredTenants: TenantsTypeEnum

}

export type TPropertyDetails = PropertyDetails & Document
export const PropertyDetailsSchema = SchemaFactory.createForClass(PropertyDetails)
