import { DateTime } from 'luxon';

export const getNearQuery = (defaultSortingColumn: string) => {
  return {
    near: {
      origin: DateTime.fromISO(new Date().toISOString()).toJSDate(),
      path: defaultSortingColumn,
      pivot: 6400,
    },
  };
};
