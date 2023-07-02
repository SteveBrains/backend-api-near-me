import { BaseModelDto } from "@libs/libs/database";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AddressDto {
    @Field(type => String, { nullable: true })
    country: string

    @Field(type => String, { nullable: true })
    city: string

    @Field(type => String, { nullable: true })
    street: string
}

@InputType()
export class OwnerDto extends BaseModelDto {

    @Field(type => String, { nullable: true })
    firstName: string

    @Field(type => String, { nullable: true })
    lastName: string

    @Field(type => String, { nullable: true })
    email: string

    @Field(type => String, { nullable: true })
    mobile: string

    @Field(type => AddressDto, { nullable: true })
    address: AddressDto
}