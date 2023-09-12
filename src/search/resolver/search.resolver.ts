import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { SearchRepo } from '../repo';
import { Location, Search } from '../schema';
import { SearchService } from '../service';

@Resolver()
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}
  @Query(() => Location)
  async searchQuery() {
    return this.searchService.getSearchResoults();
  }

  @Mutation(() => Boolean)
  searchMutation() {
    return true;
  }
  @Query(() => [Location])
  async locationSearchByWordQuery(
    @Args({ name: 'street', type: () => String }) streetName: string,
  ) {
    return this.searchService.locationSearchByWord(streetName);
  }
  @Query(() => [Location])
  async locationSearchByLetterQuery(
    @Args({ name: 'street', type: () => String }) streetName: string,
  ) {
    return this.searchService.locationSearchByLetter(streetName);
  }

  @Query(() => [Location])
  async getNearProperties(
    @Args({ name: 'latitude', type: () => String })
    lattitude: string,
    @Args({ name: 'longitude', type: () => String })
    longitude: string,
  ) {
    return this.searchService.getNearProperties(lattitude, longitude);
  }
}
