export const houseProperties = {
  __v: {
    type: 'long',
  },
  name: {
    type: 'text',
    fields: {
      keyword: {
        type: 'keyword',
        ignore_above: 256,
      },
    },
  },
  createdAt: {
    type: 'date',
  },
  description: {
    type: 'text',
    fields: {
      keyword: {
        type: 'keyword',
        ignore_above: 256,
      },
    },
  },
  id: {
    type: 'text',
    fields: {
      keyword: {
        type: 'keyword',
        ignore_above: 256,
      },
    },
  },
  isActive: {
    type: 'boolean',
  },
  isDeleted: {
    type: 'boolean',
  },
  updatedAt: {
    type: 'date',
  },
};
