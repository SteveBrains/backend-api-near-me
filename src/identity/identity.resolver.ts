import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IdentityRepo } from './repo';
import { ElasticsearchIndexerService } from '@libs/libs/elastic-search/elastic-search-indexer.service';
import { PagingInputDto } from '@libs/libs/dto/page-input-dto';
import { SortingInputDto } from '@libs/libs/dto/sorting-input-dto';
import { QueryIdentityDto } from './dto/query-identity.dto';

@Resolver()
export class IdentityResolver {
  constructor(
    private readonly identityRepo: IdentityRepo,
    private readonly es: ElasticsearchIndexerService,
  ) {}

  @Mutation(() => String)
  async createIdentity(@Args('name') name: string) {
    await this.identityRepo.create(this.identityRepo.newId(), { name });
    await this.es.index('', '');
    const idens = await this.identityRepo.findManyWithCursor();
    let iden = await idens.next();
    const bulkPayload = [];
    while (iden) {
      iden = iden.toJSON();
      bulkPayload.push(iden);

      iden = await idens.next();
    }

    if (bulkPayload?.length) {
      console.log(`Indexing`);
      await this.es.bulkUpdate(bulkPayload);
    }
    return name;
  }

  @Query(() => QueryIdentityDto)
  async searches(
    @Args('query', { type: () => String, nullable: true, defaultValue: '' })
    query: string,
    @Args({
      name: 'paging',
      nullable: true,
      defaultValue: new PagingInputDto(),
    })
    pagingInputDto: PagingInputDto,
    @Args({
      name: 'sorting',
      type: () => [SortingInputDto],
      nullable: true,
      defaultValue: [{ field: 'createdAt', order: -1 }],
    })
    sortingInputDto: Array<SortingInputDto>,
  ) {
    return this.identityRepo.elasticSearchChatResponse(
      query,
      pagingInputDto,
      sortingInputDto,
    );
  }
}
