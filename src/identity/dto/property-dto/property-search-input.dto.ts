import { BaseModelDto } from "@libs/libs";
import { BuildingTypeEnum, FurnishingTypeEnum, ParkableVehiclesEnum, PowerBackUpEnum, ProperTypeEnum, PropertyAgeEnum, TenantsTypeEnum, WashRoomTypeEnum, WaterStorageTypeEnum } from "@libs/libs/constants/enums/properties.enum";
import { NumberRangeInputDto } from "@libs/libs/dto/common-input.dto";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class PropertySearchFilterInputDto extends BaseModelDto {

    @Field(type => [String], { nullable: true })
    ownerId: string[]

    // property details

    @Field(type => [ProperTypeEnum], { nullable: true })
    propertyType: ProperTypeEnum[]

    @Field(type => [BuildingTypeEnum], { nullable: true })
    buildingType: BuildingTypeEnum[]

    @Field(type => PropertyAgeEnum, { nullable: true }) // should be a number
    propertyAge: PropertyAgeEnum

    @Field(type => NumberRangeInputDto, { nullable: true })
    floor: NumberRangeInputDto

    @Field(type => NumberRangeInputDto, { nullable: true })
    totalFloors: NumberRangeInputDto

    @Field(type => [FurnishingTypeEnum], { nullable: true })
    furnishingType: FurnishingTypeEnum[]

    @Field(type => [String], { nullable: true })
    furnishedThings: string[]

    @Field(type => [TenantsTypeEnum], { nullable: true })
    preferredTenants: TenantsTypeEnum[]

    // location details

    @Field(type => String, { nullable: true })
    country: string

    @Field(type => String, { nullable: true })
    city: string

    @Field(type => [Number], { nullable: true })
    location: number[]

    @Field(type => [String], { nullable: true })
    street: string[]

    @Field(type => String, { nullable: true })
    landMark: string

    // rental details

    @Field(type => NumberRangeInputDto, { nullable: true })
    rentalAmount: NumberRangeInputDto

    @Field(type => Boolean, { nullable: true })
    isRentNegotiable: boolean

    @Field(type => Boolean, { nullable: true })
    isMaintainanceIncluded: boolean

    @Field(type => NumberRangeInputDto, { nullable: true })
    maintainanceAmount: NumberRangeInputDto

    @Field(type => NumberRangeInputDto, { nullable: true })
    depositAmount: NumberRangeInputDto

    @Field(type => NumberRangeInputDto, { nullable: true })
    leaseDuration: NumberRangeInputDto

    // resources

    @Field(type => [PowerBackUpEnum], { nullable: true })
    powerBackup: PowerBackUpEnum[]

    @Field(type => [ParkableVehiclesEnum], { nullable: true })
    parkableVehicles: ParkableVehiclesEnum[]

    @Field(type => Boolean, { nullable: true })
    liftAvailable: boolean

    @Field(type => [WashRoomTypeEnum], { nullable: true })
    washroomType: WashRoomTypeEnum[]

    @Field(type => [WaterStorageTypeEnum], { nullable: true })
    waterStorageType: WaterStorageTypeEnum[]

    @Field(type => Boolean, { nullable: true })
    hasSecurity: boolean

    @Field(type => Boolean, { nullable: true })
    hasWifi: boolean

    //  additional info

    @Field(type => TenantsTypeEnum, { nullable: true })
    previousTenants: TenantsTypeEnum

    @Field(type => String, { nullable: true })
    propertyWalkthroughBy: string

    @Field(type => Boolean, { nullable: true })
    shouldPaintWhenVacating: boolean

    @Field(type => Boolean, { nullable: true })
    shouldCleanWhenVacating: boolean

}
