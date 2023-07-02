import { Owner } from "@libs/libs/database/mongoose/people/owners.shema";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class QueryOwnerDto {

    @Field(type => String, { nullable: true })
    count: string

    @Field(type => [Owner], { nullable: true })
    items: [Owner]
}