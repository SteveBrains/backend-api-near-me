import { Field, InputType, PartialType } from "@nestjs/graphql"
import { CreatePropertyAdditionalInfoDto, CreatePropertyDetailsDto, CreatePropertyGalleryDto, CreatePropertyLocationDetailsDto, CreatePropertyRentalDetailsDto, CreatePropertyResourcesDto } from "./create-property.input.dto"

@InputType()
export class UpdatePropertyDetailsDto extends PartialType(CreatePropertyDetailsDto) {
}

@InputType()
export class UpdatePropertyLocationDetailsDto extends PartialType(CreatePropertyLocationDetailsDto) {
}

@InputType()
export class UpdatePropertyRentalDetailsDto extends PartialType(CreatePropertyRentalDetailsDto) {
}

@InputType()
export class UpdatePropertyResourcesDto extends PartialType(CreatePropertyResourcesDto) {
}

@InputType()
export class UpdatePropertyGalleryDto extends PartialType(CreatePropertyGalleryDto) {
}

@InputType()
export class UpdatePropertyAdditionalInfoDto extends PartialType(CreatePropertyAdditionalInfoDto) {
}


@InputType()
export class UpdatePropertyDto {
    // @Field(type => String)
    // ownerId: string   // shouldn't allow to update owner

    @Field(type => UpdatePropertyDetailsDto, { nullable: true })
    propertyDetails: UpdatePropertyDetailsDto

    @Field(type => UpdatePropertyLocationDetailsDto, { nullable: true })
    locationDetails: UpdatePropertyLocationDetailsDto

    @Field(type => UpdatePropertyRentalDetailsDto, { nullable: true })
    rentalDetails: UpdatePropertyRentalDetailsDto

    @Field(type => UpdatePropertyResourcesDto, { nullable: true })
    propertyResources: UpdatePropertyResourcesDto

    @Field(type => UpdatePropertyGalleryDto, { nullable: true })
    propertyGallery: UpdatePropertyGalleryDto

    @Field(type => UpdatePropertyAdditionalInfoDto, { nullable: true })
    propertyAdditionalInfo: UpdatePropertyAdditionalInfoDto

}