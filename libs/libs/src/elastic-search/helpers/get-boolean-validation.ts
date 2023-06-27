export const defaultsBoolean = fieldValue => {
  const nullables = [null, undefined];
  if (nullables.includes(fieldValue)) return false;
  else return fieldValue;
};
