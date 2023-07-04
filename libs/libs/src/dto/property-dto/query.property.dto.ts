import { BaseModelDto } from "@libs/libs/database";
import { Property } from "@libs/libs/database/mongoose/assets/property/property.schema";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class QueryPropertyDto extends BaseModelDto {
    @Field(() => Number, { nullable: true })
    count: number

    @Field(() => [Property], { nullable: true, defaultValue: [] })
    items: Property[]

}