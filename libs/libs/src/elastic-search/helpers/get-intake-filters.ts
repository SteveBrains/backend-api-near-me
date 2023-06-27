export const intakeFilters = (month, year, intakes, tableName?: string) => {
  const intakesQuery = [];
  const intakeMonth = `${month}.keyword`;
  const intakeYear = year;
  intakes.forEach(([month, year]) => {
    intakesQuery.push({
      bool: {
        filter: [
          {
            term: {
              [intakeMonth]: month,
            },
          },
          {
            term: {
              [intakeYear]: year,
            },
          },
        ],
      },
    });
  });

  return intakesQuery;
};
