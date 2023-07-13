import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class NumberRangeInputDto {

    @Field(() => Number, { nullable: true })
    gte: number

    @Field(() => Number, { nullable: true })
    lte: number
}

@InputType()
export class DateRangeInputDto {

    @Field(() => Date, { nullable: true })
    fromDate: Date

    @Field(() => Date, { nullable: true })
    toDate: Date
}