import lodash from 'lodash'

const normalizeOrderByItem = item => {
  if (lodash.isString(item)) {
    return { column: item, order: 'asc' };
  }

  if (lodash.isObject(item) && lodash.isString(item.column)) {
    const { column, order = 'asc' } = item;

    return { column, order: order.toLowerCase() };
  }

  throw new Error('Order by item must be a string or an object');
};

const normalizeOrderBy = orderBy => {
  if (!orderBy) {
    return [];
  }

  if (lodash.isArray(orderBy)) {
    return orderBy.map(normalizeOrderByItem);
  }

  return [normalizeOrderByItem(orderBy)];
};

export default normalizeOrderBy;
