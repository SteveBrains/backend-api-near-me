export const getAggregationQueryEs = (path = 'name', query = {}, size = 20, suffix = 'keyword') => {
  return {
    terms: {
      field: `${path}.${suffix}`,
      size,
    },
    ...query,
  };
};
