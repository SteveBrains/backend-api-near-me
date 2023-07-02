import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreatePropertyInputDto {

    @Field(type => String)
    ownerId: string

    @Field(type => String)
    propertyType: string
}