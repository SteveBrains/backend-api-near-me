import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SortingInputDto {
  @Field(() => String)
  field: string;

  @Field(() => Int, { defaultValue: -1 })
  order: number;
}
