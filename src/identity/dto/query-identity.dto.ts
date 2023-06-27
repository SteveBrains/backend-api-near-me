import { Field, ObjectType } from '@nestjs/graphql';
import { Identity } from '../schema';

@ObjectType({ isAbstract: true })
export abstract class PageDto {
  @Field({ nullable: true })
  count: number;

  abstract items: any[];
}

@ObjectType()
export class QueryIdentityDto extends PageDto {
  @Field(() => [Identity])
  items: Identity[];
}
