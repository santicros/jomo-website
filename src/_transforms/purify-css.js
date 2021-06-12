const fs = require('fs');
const PurgeCSS = require('purgecss').PurgeCSS;
const csso = require('csso');
const pathToCss = './.cache/processed.css';

/**
 * Inlines all of the page's CSS into the <head>
 */

const purifyCss = async (content, outputPath) => {
  if (
    outputPath &&
    outputPath.endsWith('.html') &&
    !/data-style-override/.test(content)
  ) {
    const before = fs.readFileSync(pathToCss, {
      encoding: 'utf-8',
    });

    const purged = await new PurgeCSS().purge({
      content: [
        {
          raw: content,
          extension: 'html',
        },
      ],
      css: [
        {
          raw: before,
        },
      ],
      fontFace: true,
      defaultExtractor: (content) => {
        return content.match(/[A-Za-z0-9\\:_-]+/g) || [];
      },
    });

    const after = csso.minify(purged[0].css).css;
    if (!after.length) {
      throw new Error(`Minified CSS for ${outputPath} has no length.`);
    }
    // console.log("CSS reduction", before.length - after.length);
    content = content.replace('</head>', `<style>${after}</style></head>`);
    return content;
  }

  return content;
};

module.exports = { purifyCss };
