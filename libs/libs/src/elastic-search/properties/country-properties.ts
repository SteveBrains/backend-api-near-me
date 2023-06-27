export const countryProperties = {
  __v: {
    type: 'long',
  },
  state: {
    type: 'text',
    fields: {
      keyword: {
        type: 'keyword',
        ignore_above: 256,
      },
    },
  },
  postcode: {
    type: 'text',
    fields: {
      keyword: {
        type: 'keyword',
        ignore_above: 256,
      },
    },
  },
  street: {
    type: 'text',
    fields: {
      keyword: {
        type: 'keyword',
        ignore_above: 256,
      },
    },
  },
  district: {
    type: 'text',
    fields: {
      keyword: {
        type: 'keyword',
        ignore_above: 256,
      },
    },
  },
  unit: {
    type: 'text',
    fields: {
      keyword: {
        type: 'keyword',
        ignore_above: 256,
      },
    },
  },
  region: {
    type: 'text',
    fields: {
      keyword: {
        type: 'keyword',
        ignore_above: 256,
      },
    },
  },
  number: {
    type: 'text',
    fields: {
      keyword: {
        type: 'keyword',
        ignore_above: 256,
      },
    },
  },
  city: {
    type: 'text',
    fields: {
      keyword: {
        type: 'keyword',
        ignore_above: 256,
      },
    },
  },
  location: {
    properties: {
      // type: {
      //   type: 'text',
      //   keyword: {
      //     type: 'keyword',
      //     ignore_above: 256,
      //   },
      // },
      coordinates: {
        type: 'long',
      },
    },
  },
  createdAt: {
    type: 'date',
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
