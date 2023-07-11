import { ParkableVehiclesEnum, PowerBackUpEnum, WashRoomTypeEnum, WaterStorageTypeEnum } from "@libs/libs/constants/enums/properties.enum";
import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@ObjectType()
@Schema()
export class PropertyResources {

    @Field(type => PowerBackUpEnum, { nullable: true })
    @Prop({ type: String })
    powerBackup: PowerBackUpEnum

    @Field(type => ParkableVehiclesEnum, { nullable: true })
    @Prop({ type: String })
    parkableVehicles: ParkableVehiclesEnum

    @Field(type => Boolean, { nullable: true })
    @Prop({ type: Boolean })
    liftAvailable: boolean

    @Field(type => WashRoomTypeEnum, { nullable: true })
    @Prop({ type: String })
    washroomType: WashRoomTypeEnum

    @Field(type => WaterStorageTypeEnum, { nullable: true })
    @Prop({ type: String })
    waterStorageType: WaterStorageTypeEnum

    @Field(type => Boolean, { nullable: true })
    @Prop({ type: Boolean })
    hasSecurity: boolean

    @Field(type => Boolean, { nullable: true })
    @Prop({ type: Boolean })
    hasWifi: boolean

}
export type TPropertyResources = PropertyResources & Document
export const PropertyResourcesSchema = SchemaFactory.createForClass(PropertyResources)