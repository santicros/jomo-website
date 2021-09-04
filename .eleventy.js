// Filters
const { absolute } = require('./src/_filters/urls');

// Transforms
const { purifyCss } = require('./src/_transforms/purify-css');
const { minifyHtml } = require('./src/_transforms/minify-html');

// Plugins
const svgContents = require("eleventy-plugin-svg-contents");

// ENV Flag
const isProduction = process.env.NODE_ENV === 'production';

module.exports = (eleventyConfig) => {
  // Add filters
  eleventyConfig.addFilter('absolute', absolute);
  eleventyConfig.addFilter('postDate', (dateObj) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
      day: 'numeric',
    }).format(dateObj);
  });
  eleventyConfig.addFilter('isoDate', (dateObj) => {
    return dateObj.toISOString().split('T')[0];
  });

  eleventyConfig.addPlugin(svgContents);

  // Copy
  eleventyConfig.addPassthroughCopy({ 'src/_static/fonts': 'fonts' });
  eleventyConfig.addPassthroughCopy({ 'src/_static/img': 'img' });

  if (!isProduction) {
    eleventyConfig.addWatchTarget('src/_static/css/tailwind.css');
  }

  // Only minify HTML and inline CSS if we are in production.
  //
  // !!! Important !!!
  // These transforms should _always_ go last because they look at the final
  // HTML for the page and inline CSS / minify.
  if (isProduction) {
    // eleventyConfig.addTransform('purifyCss', purifyCss);
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
