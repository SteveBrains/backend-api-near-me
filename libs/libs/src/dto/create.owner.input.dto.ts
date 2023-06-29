import { Field, InputType, ObjectType } from "@nestjs/graphql"

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

}