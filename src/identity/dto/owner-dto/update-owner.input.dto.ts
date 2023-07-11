import { Field, InputType } from "@nestjs/graphql"
import { AddressInputDto } from "./create.owner.input.dto"

@InputType()
export class UpdateOwnerInputDto {
    @Field(() => String, { nullable: true })
    firstName: string

    @Field(() => String, { nullable: true })
    lastName: string

    @Field(() => String, { nullable: true })
    mobile: string

    @Field(() => AddressInputDto, { nullable: true })
    address: AddressInputDto
}