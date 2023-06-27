import { kebabCase } from 'lodash';

const INSTANCE_ID = 'dev';
const ELASTIC_PREFIX = 'server';

export const getIndiceName = (schemaName: string) => {
  if (!schemaName) throw new Error('getIndiceName name must be passed');
  return kebabCase(`${INSTANCE_ID}-${ELASTIC_PREFIX}${schemaName}`);
};

export const getResumeTokenKey = (indiceName: string) => {
  if (!indiceName)
    throw new Error('getResumeTokenKey indiceName must be passed');
  return kebabCase(`${INSTANCE_ID}${indiceName}`);
};

export const getElasticTotal = (elasticResponse: any) => {
  return elasticResponse?.hits?.total?.value;
};

export const getElasticDocuments = (elasticResponse: any) => {
  const items = elasticResponse?.hits?.hits?.map((hit) => hit?._source);
  return items || [];
};

export const getElasticDocumentsID = (elasticResponse: any) => {
  const items = elasticResponse?.hits?.hits?.map((hit) => {
    return hit?._id;
  });
  return items || [];
};

export const getElasticDocumentsWithExplanation = (elasticResponse: any) => {
  const items = elasticResponse?.hits?.hits?.map((hit) => ({
    _source: hit?._source,
    _explanation: hit?._explanation,
  }));
  return items || [];
};

export const getElasticDocumentsWithHighLights = (elasticResponse: any) => {
  const items = elasticResponse?.hits?.hits?.map((hit) => ({
    _source: hit?._source,
    highlight: hit?.highlight,
  }));
  return items || [];
};

export enum OperationType {
  insert = 'insert',
  update = 'update',
  replace = 'replace',
  delete = 'delete',
  rename = 'rename',
  drop = 'drop',
  dropDatabase = 'dropDatabase',
  invalidate = 'invalidate',
}

export const DocumentOperationTypes = [
  OperationType.insert.toString(),
  OperationType.update.toString(),
  OperationType.replace.toString(),
];

export const MONGO_DB_CURSOR_BULK_SIZE = 2;
