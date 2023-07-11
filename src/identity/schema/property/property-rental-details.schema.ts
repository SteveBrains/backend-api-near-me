import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@ObjectType()
@Schema()
export class PropertyRentalDetails {

    @Field(type => Number, { nullable: true })
    @Prop({ type: Number })
    rentalAmount: number

    @Field(type => Boolean, { nullable: true })
    @Prop({ type: Boolean })
    isRentNegotiable: boolean

    @Field(type => Boolean, { nullable: true })
    @Prop({ type: Boolean })
    isMaintainanceIncluded: boolean

    @Field(type => Number, { nullable: true })
    @Prop({ type: Number })
    maintainanceAmount: number

    @Field(type => Number, { nullable: true })
    @Prop({ type: Number })
    depositAmount: number

    @Field(type => Number, { nullable: true })
    @Prop({ type: Number })
    refundableDepositAmount: number

    @Field(type => Number, { nullable: true })
    @Prop({ type: Number })
    leaseDuration: number // number in years

}

export type TRentalDetails = PropertyRentalDetails & Document
export const PropertyRentalDetailsSchema = SchemaFactory.createForClass(PropertyRentalDetails)
