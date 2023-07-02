import { Owner } from "@libs/libs/database/mongoose/people/owners.shema";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class QueryOwnerDto {

    @Field(type => Number, { nullable: true })
    count: number

    @Field(type => [Owner], { nullable: true, defaultValue: [] })
    items: Owner[]
}