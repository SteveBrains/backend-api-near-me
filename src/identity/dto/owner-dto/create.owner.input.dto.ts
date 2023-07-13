import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class AddressInputDto {

    @Field(type => String, { nullable: true })
    country: string

    @Field(type => String, { nullable: true })
    city: string

    @Field(type => String, { nullable: true })
    street: string

}

@InputType()
export class CreateOwnerInputDto {
    @Field(() => String, { nullable: true })
    firstName: string

    @Field(() => String, { nullable: true })
    lastName: string

    @Field(() => String, { nullable: true })
    email: string

    @Field(() => String, { nullable: true })
    mobile: string

    @Field(() => AddressInputDto, { nullable: true })
    address: AddressInputDto

}




