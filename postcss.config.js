const CONFIG = require('./config.js');
const purgecss =
  process.env.NODE_ENV === 'production' ? require('@fullhuman/postcss-purgecss') : () => {};

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-extend-rule'),
    require('postcss-each'),
    require('postcss-for'),
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    require('postcss-nested'),
    require('postcss-assets')({
      loadPaths: [`src/${CONFIG.imgs}`, `src/${CONFIG.svgs}`],
    }),
    require('postcss-calc'),
    require('postcss-hexrgba'),
    require('postcss-pxtorem')({
      propList: ['*', '!text-shadow'],
      minPixelValue: 2,
    }),
    purgecss({
      content: ['src/**/*.ejs', 'src/**/*.js'],
      fontFace: true,
      keyframes: true,
      variables: true,
      defaultExtractor: (content) => content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
      skippedContentGlobs: ['node_modules/**'],
      safelist: {
        deep: [
          /:not/,
          /:nth-child/,
          /:first-child/,
          /:last-child/,
          /:checked/,
          /:disabled/,
          /:read-only/,
          /--/,
          /tns-/,
        ],
      },
    }),
    require('autoprefixer')({
      overrideBrowserslist: ['> 1%', 'last 5 versions', 'Firefox >= 45', 'ios >= 8', 'ie >= 10'],
    }),
    require('postcss-color-rgba-fallback'),
  ],
};
