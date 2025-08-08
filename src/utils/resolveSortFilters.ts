export const resolveSortFilters = (
  sortBy: string,
  order: string,
): Record<string, 'ASC' | 'DESC'> => {
  const orderObj: Record<string, 'ASC' | 'DESC'> = {};

  if (!sortBy) return orderObj;

  const sortFields = sortBy.split(',');
  const orderDirections = order ? order.split(',') : [];

  sortFields.forEach((field, index) => {
    const dir = (orderDirections[index] || 'ASC').toUpperCase();
    orderObj[field] = dir === 'DESC' ? 'DESC' : 'ASC';
  });

  return orderObj;
};
