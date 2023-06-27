import { isDate } from 'lodash';
import { DateTime } from 'luxon';

export const IsDeletedQuery = {
  term: {
    isDeleted: false,
  },
};
export const getTextMatchQuery = (query: string | boolean | number, path = 'name') => {
  return {
    term: {
      [path]: query,
    },
  };
};

export const getKeywordTermQuery = (query: any, path = 'name', suffix = 'keyword') => {
  if (suffix) {
    path = path + '.' + suffix;
  }
  return {
    term: {
      [path]: query,
    },
  };
};
export const getTermsQuery = (query: any, path = 'name') => {
  path = `${path}.keyword`;
  return {
    terms: {
      [path]: query,
    },
  };
};

export const getShouldQueries = (path = 'name', query: any) => {
  path = `${path}.keyword`;
  return {
    terms: {
      [path]: query,
    },
  };
};

export const getTextQueryArray = (path = 'name', filterArray, fieldName?: string) => {
  const shouldQuery = [];
  filterArray?.map(c => {
    return shouldQuery.push(getTextMatchQuery(c?.[fieldName] ? c?.[fieldName] : c, path));
  });
  return {
    bool: {
      should: shouldQuery,
      minimum_should_match: shouldQuery.length ? 1 : 0,
    },
  };
};

export const getTextQueryAray = (path = 'name', filterArray, fieldName?: string) => {
  const shouldQuery = [];
  filterArray?.forEach(c => {
    return shouldQuery.push(getTextMatchQuery(c?.[fieldName] ? c?.[fieldName] : c, path));
  });
  return shouldQuery;
};

export const getBooleanQueries = (path = 'name', filterArray) => {
  const boolQuery = {
    term: {
      [path]: filterArray,
    },
  };
  return boolQuery;
};

export const getDateRangeQueryArray = (path = 'name', filterArray) => {
  const textQuery = {
    range: {
      [path]: { gte: filterArray?.from, lt: filterArray?.to },
    },
  };
  if (filterArray?.from && filterArray?.to) {
    return textQuery;
  } else return;
};

export const getElasticRangeQuery = (
  path = 'name',
  range: { gt?: number | Date; lt?: number | Date; lte?: number | Date; gte?: number | Date },
) => {
  return {
    range: {
      [path]: {
        gte: range.gte,
        lte: range.lte,
        gt: range?.gt,
        lt: range.lt,
      },
    },
  };
};

export const buildDateRangeFilterQuery = (range, path) => {
  if (!range) new Error('Empty range');

  if (range?.from && !isDate(range?.from)) {
    range.from = DateTime.fromISO(range?.from).toJSDate();
  }
  if (range?.to && !isDate(range?.to)) {
    range.to = DateTime.fromISO(range?.to).toJSDate();
  }

  const rangeQuery = {
    gte: range?.from,
    lte: DateTime.fromJSDate(range?.to).toJSDate() || DateTime.fromJSDate(range?.from).toJSDate(),
  };

  return getElasticRangeQuery(path, rangeQuery);
};

export const getBooleanQuery = (query: boolean | string, path: string) => {
  const booleanQuery = {
    term: {
      [path]: query,
    },
  };

  return booleanQuery;
};

export const getMultiMatchQuery = (query: string, type: string, fields: string[], operator = 'or') => {
  return {
    multi_match: {
      query,
      type,
      fields,
      operator,
    },
  };
};

export const getUserQuery = (query: string, path = 'name') => {
  return {
    term: {
      [path]: query,
    },
  };
};

export const getNumberQueryArray = (query: any, path = 'name') => {
  return {
    terms: {
      [path]: query,
    },
  };
};

export const getNumberRangeQuery = (path = 'name', range: { gte?: number | Date; lte?: number | Date }) => {
  return {
    range: {
      [path]: {
        gte: range.gte,
        lte: range.lte,
      },
    },
  };
};

export const addPrefixToFields = (prefix, fieldName) => {
  return prefix + '.' + fieldName;
};
