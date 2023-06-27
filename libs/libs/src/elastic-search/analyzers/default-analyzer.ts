export const defaultAnalyzers = {
  analysis: {
    filter: {
      edge_ngram: {
        type: 'edge_ngram',
        min_gram: 1,
        max_gram: 20,
      },
    },
    analyzer: {
      phone_analyzer: {
        type: 'custom',
        char_filter: ['digit_only'],
        tokenizer: 'edge_ngram',
        filter: ['trim'],
      },
      autocomplete: {
        type: 'custom',
        tokenizer: 'standard',
        filter: ['lowercase', 'edge_ngram', 'trim'],
      },
    },
    char_filter: {
      digit_only: {
        type: 'pattern_replace',
        pattern: '\\D+',
        replacement: '',
      },
    },
  },
};
