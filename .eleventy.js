// Filters
const { absolute } = require('./src/_filters/urls');

// Transforms
const { purifyCss } = require('./src/_transforms/purify-css');
const { minifyHtml } = require('./src/_transforms/minify-html');

// ENV Flag
const isProduction = process.env.NODE_ENV === 'production';

module.exports = (eleventyConfig) => {
  // Add filters
  eleventyConfig.addFilter('absolute', absolute);

  // Copy
  eleventyConfig.addPassthroughCopy({ 'src/_static/fonts': 'fonts' });

  if (!isProduction) {
    eleventyConfig.addWatchTarget('src/_static/css/tailwind.css');
  }

  // Only minify HTML and inline CSS if we are in production.
  //
  // !!! Important !!!
  // These transforms should _always_ go last because they look at the final
  // HTML for the page and inline CSS / minify.
  if (isProduction) {
    eleventyConfig.addTransform('purifyCss', purifyCss);
    eleventyConfig.addTransform('minifyHtml', minifyHtml);
  }

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
