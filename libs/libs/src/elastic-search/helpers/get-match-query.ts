export const getKeywordMatchQuery = (query: string, path: string, operator = 'and') => {
  return {
    match: {
      [path]: {
        query,
        operator,
      },
    },
  };
};
