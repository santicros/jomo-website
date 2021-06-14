const minify = require('html-minifier').minify;

const minifyHtml = (content, outputPath) => {
  if (outputPath && outputPath.endsWith('.html')) {
    try {
      content = minify(content, {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeComments: true,
        sortClassName: true,
        sortAttributes: true,
        html5: true,
        decodeEntities: true,
        minifyJS: true,
      });
      return content;
    } catch (err) {
      console.warn('Could not minify html for', outputPath);
    }
  }

  return content;
};

module.exports = { minifyHtml };
