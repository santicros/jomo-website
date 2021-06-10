// Filters
const { absolute } = require("./src/_filters/urls");

module.exports = (eleventyConfig) => {
  eleventyConfig.addFilter("absolute", absolute);
  
  eleventyConfig.addPassthroughCopy("src/fonts");

  eleventyConfig.addWatchTarget("src/css");

  eleventyConfig.addPlugin(require("./src/_11ty/optimize-html.js"));

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
