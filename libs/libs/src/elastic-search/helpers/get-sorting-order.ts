export const getSortingOrder = sortingInput => {
  const sortingArray = sortingInput?.map(fieldValue => {
    const fieldName = `${fieldValue?.field}`;
    return {
      [fieldName]: fieldValue.order === 1 ? 'asc' : 'desc',
    };
  });

  if (!sortingArray.length) {
    sortingArray.push({
      createdAt: 'desc',
    });
  }
  return sortingArray;
};

export const keywordedSortingFields = field => {
  return field + '.keyword';
};

export const nonKeywordedSortingFields = field => {
  return field;
};
