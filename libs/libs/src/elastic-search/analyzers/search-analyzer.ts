export const searchAnalyzers = {
  analysis: {
    analyzer: {
      analyzer: {
        ngram_analyzer: {
          tokenizer: 'ngram_tokenizer',
          filter: ['lowercase'],
        },
        autocomplete_search: {
          tokenizer: 'lowercase',
        },
      },
      tokenizer: {
        ngram_tokenizer: {
          type: 'edge_ngram',
          min_gram: 2,
          max_gram: 20,
          token_chars: ['letter'],
        },
      },
    },
  },
};
