import { Field, ObjectType } from "@nestjs/graphql"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"
import { BaseModel } from "../base.model"

@ObjectType()
@Schema()
export class Property extends BaseModel {
    @Field(type => String)
    @Prop({ type: String, required: true })
    ownerId: string

    @Field(type => String)
    @Prop({ type: String, required: true })
    propertyType: string

}

export type TProperty = Property & Document
export const PropertySchema = SchemaFactory.createForClass(Property)


/*
1.Property Details

{
    propertyType :enum
    buildingType: enum
    propertyAge : string
    floor : string
    totalFloors : number
    furnishing: enum
    furninshedThings: string[]
    preferredTenants: enum  

}

2.Location Details
{
    country : string
    city : string
    locality : geoLocation (lat, long or string) ( flexibility to get location from google maps )
    area : string
    street : string 
    landmark : string 
}

3.Rental Details
{
    rentalAmount : number 
    isRentNegotiable: boolean
    isMaintainanceIncluded:boolean
    maintainanceAmount:number ( if isMaintainanceIncluded === false)
    deposit : number
    amountRefundedWhileVacating : number
    leaseDuration : number (in years ) 
    lockinPeriod : number ( in years )

}

4.Resources
{
    powerBackup:enum
    parkableVehicles:enum
    liftFacility: boolean
    parkingFlexibilityFor: enum
    washroomType:enum
    waterStorageType:enum
    security:boolean
    wifi:boolean

}

5.Gallery
{
    photos
    videos
}

6.Additional Information

{
    propertyDescription : string
    previousTenants : string
    propertyWalkthroughBy: string
    shouldPaintWhenVacating: boolean
    shouldCleanWhenVacating: boolean
}
*/