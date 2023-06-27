const { generateTemplateFiles } = require('generate-template-files');

generateTemplateFiles([
  {
    option: 'Create a  module for a domain',
    defaultCase: '(pascalCase)',
    entry: {
      folderPath: './tools/module',
    },
    stringReplacers: ['__name__'],
    output: {
      path: './src/__name__',
      pathAndFileNameDefaultCase: '(kebabCase)',
    },
    onComplete: (results) => {
      console.log('Generated successfully!!!');
    },
  },
])