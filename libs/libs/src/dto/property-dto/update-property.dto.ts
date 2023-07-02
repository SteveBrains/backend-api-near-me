import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class UpdatePropertyDto {
    @Field(type => String)
    ownerId: string

    @Field(type => String)
    propertyType: string
}