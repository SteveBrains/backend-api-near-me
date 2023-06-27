export function getBoolQuery(filters, key = 'should') {
  return {
    bool: {
      [key]: filters,
      minimum_should_match: filters.length ? 1 : 0,
    },
  };
}
