import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PagingInputDto {
  @Field(() => Int, { defaultValue: 25 })
  limit: number;

  @Field(() => Int, { defaultValue: 0 })
  offset: number;

  @Field(() => Int, { defaultValue: -1 })
  skip?: number;
}

export interface IDateRangeFilter {
  from: Date;
  to: Date;
}

@InputType('DateRangeFilterCampaignInput')
export class DateRangeFilterCampaignInput implements IDateRangeFilter {
  @Field(() => Date, { nullable: true })
  from: Date;

  @Field(() => Date, { nullable: true })
  to: Date;
}

@InputType()
export class CampaignFilterInputDto {
  @Field({ nullable: true })
  studentId: string;

  @Field({ nullable: true })
  counsellorId: string;

  @Field({ nullable: true })
  callStatus: string;

  @Field(() => DateRangeFilterCampaignInput, { nullable: true })
  createdAt?: IDateRangeFilter;
}
