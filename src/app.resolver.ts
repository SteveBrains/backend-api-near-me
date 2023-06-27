import { Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  home() {
    return 'home';
  }

  @Mutation(() => String)
  health() {
    return 'health';
  }
}
