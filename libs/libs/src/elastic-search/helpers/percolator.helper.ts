export const formatStringForPercolator = x => {
  return x
    ?.replace('-', '')
    ?.replace(/["|/+()]/g, '')
    ?.trim();
};

export const getPercolatorQuery = (items: string[]) => {
  const Fullname = items.shift();
  const email = items.shift();
  const refId = items.shift();
  return {
    query: {
      bool: {
        should: [
          {
            simple_query_string: {
              query: `(${items
                .map(x => {
                  if (x.includes('+')) {
                    const items = x.split('+');
                    return `(\"\"${formatStringForPercolator(items[0])}\" +\"${formatStringForPercolator(
                      items[1],
                    )}\"\")`;
                  } else {
                    return `\"${formatStringForPercolator(x)}\"`;
                  }
                })
                .join(' | ')})`,
              fields: ['searchableItems'],
              default_operator: 'and',
            },
          },
          {
            simple_query_string: {
              query: `(\"${Fullname?.replace('-', '').trim()}\")`,
              fields: ['studentFullName'],
            },
          },
          {
            simple_query_string: {
              query: `(\"${email?.replace('-', '').trim()}\") | (\"${refId?.trim()}\")`,
              fields: ['studentEmail'],
            },
          },
        ],
        minimum_should_match: 1,
      },
    },
  };
};

export const getPercolatorOperation = (student, application) => {
  const studentFullName = `${student.firstName} ${student.lastName}`;
  const searchableItems = [`${studentFullName}`, student.primaryEmail, student.referenceId];
  const universityName = application?.appStats?.universityName;
  const courseName = application.xCourseName;

  if (universityName) {
    searchableItems.push(`${formatStringForPercolator(universityName)} +${student.firstName} ${student.lastName}`);
    searchableItems.push(`${formatStringForPercolator(universityName)} +${student.primaryEmail}`);
  }
  if (courseName) {
    searchableItems.push(`${formatStringForPercolator(courseName)} +${student.firstName} ${student.lastName}`);
    searchableItems.push(`${student.primaryEmail} +${formatStringForPercolator(courseName)}`);
  }

  return getPercolatorQuery(searchableItems);
};
