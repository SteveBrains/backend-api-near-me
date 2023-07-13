import { BuildingTypeEnum, FurnishingTypeEnum, ParkableVehiclesEnum, PowerBackUpEnum, ProperTypeEnum, PropertyAgeEnum, TenantsTypeEnum, WashRoomTypeEnum, WaterStorageTypeEnum } from "@libs/libs/constants/enums/properties.enum";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreatePropertyDetailsDto {
    @Field(type => ProperTypeEnum, { nullable: true })
    propertyType: ProperTypeEnum

    @Field(type => BuildingTypeEnum, { nullable: true })
    buildingType: BuildingTypeEnum

    @Field(type => PropertyAgeEnum, { nullable: true })
    propertyAge: PropertyAgeEnum

    @Field(type => String, { nullable: true })
    floor: string

    @Field(type => Number, { nullable: true })
    totalFloors: number

    @Field(type => FurnishingTypeEnum, { nullable: true })
    furnishingType: FurnishingTypeEnum

    @Field(type => [String], { nullable: true })
    furnishedThings: string[]

    @Field(type => TenantsTypeEnum, { nullable: true })
    preferredTenants: TenantsTypeEnum
}

@InputType()
export class CreatePropertyLocationDetailsDto {

    @Field(type => String, { nullable: true })
    country: string

    @Field(type => String, { nullable: true })
    city: string

    @Field(type => [Number], { nullable: true })
    location: number[]

    @Field(type => String, { nullable: true })
    street: string

    @Field(type => String, { nullable: true })
    landMark: string
}

@InputType()
export class CreatePropertyRentalDetailsDto {
    @Field(type => Number, { nullable: true })
    rentalAmount: number

    @Field(type => Boolean, { nullable: true })
    isRentNegotiable: boolean

    @Field(type => Boolean, { nullable: true })
    isMaintainanceIncluded: boolean

    @Field(type => Number, { nullable: true })
    maintainanceAmount: number

    @Field(type => Number, { nullable: true })
    depositAmount: number

    @Field(type => Number, { nullable: true })
    refundableDepositAmount: number

    @Field(type => Number, { nullable: true })
    leaseDuration: number
}

@InputType()
export class CreatePropertyResourcesDto {
    @Field(type => PowerBackUpEnum, { nullable: true })
    powerBackup: PowerBackUpEnum

    @Field(type => ParkableVehiclesEnum, { nullable: true })
    parkableVehicles: ParkableVehiclesEnum

    @Field(type => Boolean, { nullable: true })
    liftAvailable: boolean

    @Field(type => WashRoomTypeEnum, { nullable: true })
    washroomType: WashRoomTypeEnum

    @Field(type => WaterStorageTypeEnum, { nullable: true })
    waterStorageType: WaterStorageTypeEnum

    @Field(type => Boolean, { nullable: true })
    hasSecurity: boolean

    @Field(type => Boolean, { nullable: true })
    hasWifi: boolean
}

@InputType()
export class CreatePropertyGalleryDto {

    @Field(type => [String], { nullable: true })
    photos: string[]

    @Field(type => [String], { nullable: true })
    videos: string[]
}

@InputType()
export class CreatePropertyAdditionalInfoDto {
    @Field(type => String, { nullable: true })
    propertyDescription: string

    @Field(type => TenantsTypeEnum, { nullable: true })
    previousTenants: TenantsTypeEnum

    @Field(type => String, { nullable: true })
    propertyWalkthroughBy: string

    @Field(type => Boolean, { nullable: true })
    shouldPaintWhenVacating: boolean

    @Field(type => Boolean, { nullable: true })
    shouldCleanWhenVacating: boolean
}


@InputType()
export class CreatePropertyInputDto {

    @Field(type => String)
    ownerId: string

    @Field(type => CreatePropertyDetailsDto, { nullable: true })
    propertyDetails: CreatePropertyDetailsDto

    @Field(type => CreatePropertyLocationDetailsDto, { nullable: true })
    locationDetails: CreatePropertyLocationDetailsDto

    @Field(type => CreatePropertyRentalDetailsDto, { nullable: true })
    rentalDetails: CreatePropertyRentalDetailsDto

    @Field(type => CreatePropertyResourcesDto, { nullable: true })
    propertyResources: CreatePropertyResourcesDto

    @Field(type => CreatePropertyGalleryDto, { nullable: true })
    propertyGallery: CreatePropertyGalleryDto

    @Field(type => CreatePropertyAdditionalInfoDto, { nullable: true })
    propertyAdditionalInfo: CreatePropertyAdditionalInfoDto
}