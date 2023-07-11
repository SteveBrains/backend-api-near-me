import { BaseModelDto } from "@libs/libs/database";
import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class PropertyDto extends BaseModelDto {

    @Field(type => String)
    ownerId: string

    @Field(type => String)
    propertyType: string

}