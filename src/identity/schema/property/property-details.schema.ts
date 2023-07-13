import { BuildingTypeEnum, FurnishingTypeEnum, ProperTypeEnum, PropertyAgeEnum, TenantsTypeEnum } from "@libs/libs/constants/enums/properties.enum"
import { Field, ObjectType } from "@nestjs/graphql"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from 'mongoose'

@ObjectType()
@Schema()
export class PropertyDetails {

    @Field(type => ProperTypeEnum, { nullable: true })
    @Prop({ type: String, required: true })
    propertyType: ProperTypeEnum

    @Field(type => BuildingTypeEnum, { nullable: true })
    @Prop({ type: String })
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

    @Field(type => FurnishingTypeEnum, { nullable: true })
    @Prop({ type: String })
    furnishingType: FurnishingTypeEnum

    @Field(type => [String], { nullable: true })
    @Prop({ type: [String] })
    furnishedThings: string[]

    @Field(type => TenantsTypeEnum, { nullable: true })
    @Prop({ type: String })
    preferredTenants: TenantsTypeEnum

}

export type TPropertyDetails = PropertyDetails & Document
export const PropertyDetailsSchema = SchemaFactory.createForClass(PropertyDetails)
