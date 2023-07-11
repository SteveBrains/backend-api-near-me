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
}
