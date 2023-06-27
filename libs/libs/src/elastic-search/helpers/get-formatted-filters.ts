export const getFormattedFilters = (filterObject, tableName?: string) => {
  if (tableName) {
    const populatedFilterObject = {};
    const populatedFilterObjectKeys = Object.keys(filterObject);

    populatedFilterObjectKeys.forEach(key => {
      populatedFilterObject[key] = getColumnValue(tableName, filterObject[key]);
    });

    return populatedFilterObject;
  } else {
    return filterObject;
  }
};

export const getColumnValue = (tableName, column) => {
  if (!column) throw new Error('Column value is required');
  return `${tableName}.${column}`;
};
