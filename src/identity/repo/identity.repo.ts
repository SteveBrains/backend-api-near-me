import { BaseRepo } from '@libs/libs';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PagingInputDto } from '@libs/libs/dto/page-input-dto';
import { ElasticsearchIndexerService } from '@libs/libs/elastic-search/elastic-search-indexer.service';
import { SortingInputDto } from '@libs/libs/dto/sorting-input-dto';
import { ObjectId } from 'mongodb';
import { Identity, TIdentity } from '../schema';
import { appVariables } from 'config';
const { IDENTITY_DB_CONNECTION } = appVariables

@Injectable()
export class IdentityRepo extends BaseRepo<TIdentity> {
  constructor(
    @InjectModel(Identity.name, IDENTITY_DB_CONNECTION) model: Model<TIdentity>,
    private readonly es: ElasticsearchIndexerService,
  ) {
    super(model);
  }

  async elasticSearchChatResponse(
    query: string,
    pagingInput: PagingInputDto = { limit: 100, offset: 0 },
    sortingInput: SortingInputDto[] = [],
  ) {
    if (pagingInput.limit > 100) {
      pagingInput.limit = 100;
    }
    const chatQuery = {
      _source: ['id'],
      from: pagingInput.offset,
      size: pagingInput?.limit,
      sort: [],
      query: {
        bool: {
          should: [
            {
              prefix: {
                'name.keyword': query,
              },
            },
          ],
        },
      },
    };

    const chats = await this.elasticSearch(chatQuery);

    const studentIds = chats.items?.map((chat) => getObjectId(chat.id));
    const formattedItems = await this.findByIds(studentIds);
    return {
      items: formattedItems.filter((chat) => chat),
      count: chats.total,
    };
  }

  async elasticSearch(...options) {
    if (!options[0].pit) options[0].index = this.es.indiceName;
    return this.es.search(...options);
  }
}

export const getObjectId = (oId) => {
  return new ObjectId(oId);
};
