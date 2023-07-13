import { TenantsTypeEnum } from "@libs/libs/constants/enums/properties.enum";
import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@ObjectType()
@Schema()
export class PropertyAdditionalInfo {

    @Field(type => String, { nullable: true })
    @Prop({ type: String })
    propertyDescription: string

    @Field(type => TenantsTypeEnum, { nullable: true })
    @Prop({ type: String })
    previousTenants: TenantsTypeEnum

    @Field(type => String, { nullable: true })
    @Prop({ type: String })
    propertyWalkthroughBy: string

    @Field(type => Boolean, { nullable: true })
    @Prop({ type: Boolean })
    shouldPaintWhenVacating: boolean

    @Field(type => Boolean, { nullable: true })
    @Prop({ type: Boolean })
    shouldCleanWhenVacating: boolean

}

export type TPropertyAdditionalInfo = PropertyAdditionalInfo & Document
export const PropertyAdditionalInfoSchema = SchemaFactory.createForClass(PropertyAdditionalInfo)