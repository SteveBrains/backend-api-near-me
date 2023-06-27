import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { HouseMapping } from './mappings/house-mapping';
import { indexSettings } from './index-settings';
import { defaultAnalyzers } from './analyzers/default-analyzer';
import { flatMap } from 'lodash';
import {
  DocumentOperationTypes,
  getElasticDocuments,
  getElasticDocumentsID,
  getElasticDocumentsWithExplanation,
  getElasticDocumentsWithHighLights,
  getElasticTotal,
} from './helpers';
import { InjectModel } from '@nestjs/mongoose';
import { Identity, TIdentity } from 'src/identity/schema';
import { Model } from 'mongoose';
import { ChangeStreamOptions } from 'mongodb';

@Injectable()
export class ElasticsearchIndexerService {
  constructor(private readonly elasticSearch: ElasticsearchService) {}

  public indiceName = 'dev-country-index';
  async index(name: string, mappings: any) {
    const ping = await this.elasticSearch.ping();
    console.log('A ', ping);
    this.indiceName = name;
    await this.elasticSearch.indices.delete({
      index: this.indiceName,
    });
    const indiceExists = await this.elasticSearch.indices.exists({
      index: this.indiceName,
    });
    console.log('indiceExists', indiceExists);

    if (indiceExists) {
      console.log(this.indiceName, 'Exists');
      await this.elasticSearch.indices.putMapping({
        index: this.indiceName,
        properties: mappings,
      });
      await this.elasticSearch.indices.putSettings({
        index: this.indiceName,
        settings: { ...indexSettings, ...defaultAnalyzers } as any,
      });
    } else {
      console.log('Creating');

      const createIndiceReponse = await this.elasticSearch.indices.create({
        index: this.indiceName,
        mappings: mappings,
        settings: { ...indexSettings, ...defaultAnalyzers } as any,
      });
      console.log('createIndiceReponse', createIndiceReponse);
    }
  }

  getDoc(ChatResponse) {
    return {
      ...ChatResponse,
      id: ChatResponse._id,
      _id: undefined,
    };
  }

  sanitizeDocument(doc) {
    return doc;
  }

  // async search(...options) {
  //   return this.elasticSearch.search(...options);
  // }

  bulkIndex(options) {
    return this.elasticSearch.bulk(options);
  }

  async getPit(index, keep_alive = '5m') {
    return (await this.elasticSearch.openPointInTime({ index, keep_alive })).id;
  }

  async closePit(id) {
    this.elasticSearch.closePointInTime({ id });
  }

  async search(...options): Promise<any> {
    options[0].track_total_hits = true;
    const elasticResponse = await this.elasticSearch.search(...options);
    return {
      items: getElasticDocuments(elasticResponse),
      total: parseFloat(getElasticTotal(elasticResponse)),
      aggregations: elasticResponse?.aggregations,
      hits: elasticResponse?.hits,
    };
  }

  async searchPercolator(...options): Promise<any> {
    options[0].track_total_hits = true;
    const elasticResponse = await this.elasticSearch.search(...options);
    return {
      items: getElasticDocumentsID(elasticResponse),
      total: parseFloat(getElasticTotal(elasticResponse)),
      aggregations: elasticResponse?.aggregations,
    };
  }

  async searchWithExplanation(...options): Promise<any> {
    options[0].track_total_hits = true;
    const elasticResponse = await this.elasticSearch.search(...options);
    return {
      items: getElasticDocumentsWithExplanation(elasticResponse),
      total: parseFloat(getElasticTotal(elasticResponse)),
      aggregations: elasticResponse?.aggregations,
    };
  }

  async searchWithHighlight(...options): Promise<any> {
    options[0].track_total_hits = true;
    const elasticResponse = await this.elasticSearch.search(...options);
    return {
      items: getElasticDocumentsWithHighLights(elasticResponse),
      total: parseFloat(getElasticTotal(elasticResponse)),
      aggregations: elasticResponse?.aggregations,
    };
  }

  async count(...options): Promise<any> {
    const elasticResponse = await this.elasticSearch.count(...options);
    return parseFloat(elasticResponse.count as any);
  }

  async indexExists(options) {
    return this.elasticSearch.indices.exists(options);
  }

  deleteIndex(options) {
    return this.elasticSearch.indices.delete(options);
  }

  deleteByQuery(options) {
    return this.elasticSearch.deleteByQuery(options);
  }

  delete(options) {
    return this.elasticSearch.delete(options);
  }

  deleteMany(options) {
    return this.elasticSearch.deleteByQuery(options);
  }

  updateMapping(options) {
    return this.elasticSearch.indices.putMapping({
      index: options?.index,
      dynamic: options?.mappings?.dynamic,
      properties: options?.mappings?.properties,
    });
  }

  async indexingErrorEvent(document, eventName, error) {
    // this.slackService.sendMessage({
    //   name: 'Elastic Search Indexing Error',
    //   env: process.env.NODE_ENV,
    //   eventName: eventName,
    //   errorMessage: JSON.stringify(error, null, 4),
    //   payload: `${document?.index}-${document?.id}`,
    //   service: elasticSearch.name,
    //   slackChannel: 'C04HSKXAS9M',
    // });
  }

  async findOne(id, indiceName): Promise<any> {
    const elasticResponse = await this.elasticSearch.get({
      id,
      index: indiceName,
    });
    return elasticResponse?._source;
  }

  async bulkUpdate(Reviews: any[]) {
    const payload = Reviews.map((doc) => {
      const sanitizedReview = this.sanitizeDocument(doc);
      return [
        {
          index: {
            _index: this.indiceName,
            routing: sanitizedReview._id,
            _id: sanitizedReview._id,
          },
        },
        this.getDoc(sanitizedReview),
      ];
    });
    const operations = flatMap(payload);
    const bulkResponse = await this.bulkIndex({
      refresh: true,
      routing: this.indiceName,
      operations,
    });
    if (bulkResponse.errors) {
      const erroredDocuments = [];
      bulkResponse.items.forEach((action, i) => {
        const operation = Object.keys(action)[0];
        if (action[operation].error) {
          this.indexingErrorEvent(
            action[operation]?._id,
            'ChatResponse Indexing Error',
            action[operation].error,
          );
          erroredDocuments.push({
            status: action[operation].status,
            error: action[operation].error,
          });
        }
      });
      console.log(JSON.stringify(erroredDocuments, null, 4));
    }
    return bulkResponse;
  }

  async initChangeStream() {
    const changeStreamOptions: ChangeStreamOptions = {
      batchSize: 2,
      readPreference: 'primary',
    };

    // const changeStream = this.identityModel.watch([], changeStreamOptions);

    // changeStream.on('error', async (e: any) => {
    //   console.log('error ');

    //   return;
    // });

    // changeStream.on('change', async (change: any) => {
    //   if (DocumentOperationTypes.includes(change.operationType)) {
    //     console.log('here');
    //   }
    // });
  }
}
