let IP = null;
const CONFIG = require('./config.js');
const PATH = require('path');
const WEBPACKP = require('webpack');
const MINiCSSEXTRACTPLUGIN = require('mini-css-extract-plugin');
const CSSMINIMIZERPLUGIN = require('css-minimizer-webpack-plugin');
const HTMLWEBPACKPLUGIN = require('html-webpack-plugin');
const BEAUTIFYHTMLWEBPACKPLUGIN = require('beautify-html-webpack-plugin');
const TERSERPLUGIN = require('terser-webpack-plugin');
const { HtmlWebpackSkipAssetsPlugin } = require('html-webpack-skip-assets-plugin');
const IMAGEMINIMIZERPLUGIN = require('image-minimizer-webpack-plugin');
const COPYWEBPACKPLUGIN = require('copy-webpack-plugin');
const IMAGEMINPLUGIN = require('imagemin-webpack-plugin').default;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SEOASSETSPLUGIN = require('./htmlPage/SeoAssetsPlugin.js');
const { VueLoaderPlugin } = require('vue-loader');
const REMOVEPLUGIN = require('remove-files-webpack-plugin');
// const { extendDefaultPlugins } = require('svgo');

require('dotenv').config({ path: PATH.join(__dirname, '.env') });

Object.keys(require('os').networkInterfaces()).forEach((devName) => {
  const iface = require('os').networkInterfaces()[devName];

  for (let i = 0; i < iface.length; i += 1) {
    const alias = iface[i];
    if (
      alias.family === 'IPv4' &&
      alias.address !== '127.0.0.1' &&
      !alias.internal &&
      !new RegExp('^172').test(alias.address)
    ) {
      IP = alias.address;
    }
  }
});

const extension =
  process.env.APP_ENV === 'build' && CONFIG.buildJSExtension ? CONFIG.buildJSExtension : 'js';
const extendPlugins = () => {
  // const jqueryPlugin = CONFIG.jquery ? [new WEBPACKP.ProvidePlugin({
  //   $: 'jquery',
  //   jQuery: 'jquery',
  //   'window.jQuery': 'jquery'
  // })] : [];
  const miniCssExtractCSS = new MINiCSSEXTRACTPLUGIN({
    filename:
      CONFIG.css +
      (CONFIG.commonCss ? `${CONFIG.commonCss}.css?[fullhash:8]` : '[name].css?[fullhash:8]'),
    experimentalUseImportModule: true,
  });
  let copyWebpackPlugin = () => {};
  const htmlWebpackPlugin = [];
  const beautifyHtmlWebpackPlugin = new BEAUTIFYHTMLWEBPACKPLUGIN();
  const webpackDefinePlugin = new WEBPACKP.DefinePlugin({
    'process.env': {
      APP_IP: JSON.stringify(IP),
      APP_ENV: JSON.stringify(process.env.APP_ENV || process.env.NODE_ENV),
      ROOT_FILES: JSON.stringify({
        js: CONFIG.js,
        css: CONFIG.css,
        imgs: CONFIG.imgs,
        fonts: CONFIG.fonts,
        static: CONFIG.static,
      }),
      PROJECT_ROOT: JSON.stringify(__dirname),
      SITE_URL: JSON.stringify((CONFIG.siteUrl || '').replace(/\/+$/, '')),
      PROJECT_NAME: JSON.stringify(CONFIG.projectName),
      COPYRIGHT: JSON.stringify(CONFIG.copyright),
      COMMON_PLUGINS: CONFIG.commonPlugins ? JSON.stringify(CONFIG.commonPlugins) : '',
      BUILD_JS_EXTENSION: JSON.stringify(
        process.env.APP_ENV === 'build' ? CONFIG.buildJSExtension : null
      ),
      IE_VERSION: JSON.stringify(
        CONFIG.ieVersion !== 0 ? `IE ${CONFIG.ieVersion}` : 'Microsoft Edge'
      ),
    },
  });
  const cleanWebpackPlugin =
    process.env.NODE_ENV !== 'development'
      ? new CleanWebpackPlugin({
          cleanOnceBeforeBuildPatterns: ['**/*'],
        })
      : () => {};
  const removeFiles = () => {
    const remove = [];

    if (CONFIG.removeFiles) {
      for (let i = 0; i < CONFIG.removeFiles.length; i += 1) {
        remove.push(
          `./${
            process.env.APP_ENV !== 'deploy' ? process.env.APP_ENV : 'dist'
          }/${CONFIG.removeFiles[i]}`
        );
      }
    }

    return remove;
  };
  const removePlugin =
    process.env.NODE_ENV !== 'development'
      ? new REMOVEPLUGIN({
          after: {
            include: removeFiles(),
          },
        })
      : () => {};

  for (let i = 0; i < CONFIG.plugins().length; i += 1) {
    const obj = CONFIG.plugins()[i];

    obj.inject = 'body';
    obj.cache = true;
    obj.title = obj.title || '';

    htmlWebpackPlugin.push(new HTMLWEBPACKPLUGIN(obj));
  }

  const copy = [];

  if (CONFIG.copyStatic) {
    copy.push({
      from: 'static',
      to({ absoluteFilename }) {
        const isJS = /\.js$/.test(absoluteFilename);
        return `static/[path][name]${isJS ? `.${extension}` : '[ext]'}`;
      },
    });
  }

  if (CONFIG.docker) {
    copy.push({
      from: 'docker',
      to: '',
    });
  }

  if (CONFIG.copyData) {
    for (let i = 0; i < CONFIG.copyData.length; i += 1) {
      const copyItem = CONFIG.copyData[i];

      if (typeof copyItem === 'string') {
        copy.push({
          from: CONFIG[copyItem],
          to: CONFIG[copyItem],
        });
      } else if (typeof copyItem === 'object') {
        copy.push({
          from: copyItem.from,
          to: copyItem.to,
        });
      }
    }
  }

  if (copy.length) {
    copyWebpackPlugin = new COPYWEBPACKPLUGIN({
      patterns: copy,
    });
  }

  return [miniCssExtractCSS].concat(
    [cleanWebpackPlugin],
    [removePlugin],
    [webpackDefinePlugin],
    [copyWebpackPlugin],
    htmlWebpackPlugin,
    [beautifyHtmlWebpackPlugin],
    [new HtmlWebpackSkipAssetsPlugin()],
    [
      new SEOASSETSPLUGIN({
        siteUrl: CONFIG.siteUrl,
        pages: CONFIG.plugins(),
      }),
    ],
    [new VueLoaderPlugin()],
    [
      new IMAGEMINPLUGIN({
        disable: process.env.NODE_ENV !== 'production',
        pngquant: {
          quality: '60-75',
          speed: 4,
        },
        jpegtran: {
          progressive: true,
          quality: 60,
        },
      }),
    ]
  );
};

const resolveModules = () => {
  const pathReturn = [PATH.resolve('src/')];

  Object.keys(CONFIG).forEach((value) => {
    if (typeof CONFIG[value] === 'string') {
      pathReturn.push(`${PATH.resolve(`src/${CONFIG[value]}`)}`);
    }
  });

  pathReturn.push(PATH.resolve('node_modules'));

  return pathReturn;
};

const resolveAlias = () => {
  const pathReturn = {
    '@vue': 'vue/dist/vue.esm.js',
  };

  Object.keys(CONFIG).forEach((value) => {
    if (typeof CONFIG[value] === 'string' && CONFIG[value] && /\//.test(CONFIG[value])) {
      pathReturn[`@${value}`] = PATH.join(__dirname, `src/${CONFIG[value]}`);
    }
  });

  return pathReturn;
};

module.exports = {
  context: PATH.resolve(__dirname, 'src'),
  cache: {
    type: 'memory',
  },
  entry() {
    const pathReturn = {};

    for (let i = 0; i < CONFIG.plugins().length; i += 1) {
      const entry = CONFIG.plugins()[i];

      if (entry.chunks) {
        for (let j = 0; j < entry.chunks.length; j += 1) {
          const chunks = entry.chunks[j];

          pathReturn[chunks] = `./${CONFIG.js + chunks}.js`;
        }
      }
    }

    return pathReturn;
  },
  output: {
    path: PATH.resolve(__dirname, process.env.APP_ENV !== 'deploy' ? process.env.APP_ENV : 'dist'),
    filename: `${CONFIG.js}[name].${extension}?[fullhash:8]`,
    publicPath: CONFIG.rootDirectory ? CONFIG.rootDirectory : 'auto',
    pathinfo: false,
  },
  devtool: 'eval-cheap-source-map',
  module: {
    rules: [
      {
        test: /\.ejs$/i,
        use: [
          {
            loader: 'ejs-easy-loader',
          },
        ],
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
          },
        ],
      },
      {
        test: /\.(tsx?|jsx?)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              include: PATH.resolve(__dirname, '../src'),
              configFile: `${__dirname}/.babelrc`,
              // presets: [
              //   ['@babel/preset-env', {
              //     targets: {
              //       edge: '17',
              //       firefox: '60',
              //       chrome: '67',
              //       safari: '11.1',
              //       ie: '10'
              //     }
              //   }]
              // ]
            },
          },
        ],
        include: PATH.resolve('src'),
      },
      {
        test: /\.s?css$/i,
        use: [
          {
            loader: MINiCSSEXTRACTPLUGIN.loader,
            options: {
              publicPath: (resourcePath, context) =>
                `${PATH.relative(PATH.dirname(resourcePath), context).replace(/\\/g, '/')}/`,
            },
          },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.postcss$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg|cur)$/i,
        type: 'asset/resource',
        include: PATH.resolve(__dirname, `src/${CONFIG.imgs}`),
        generator: {
          filename: '[path][name][ext]?[hash:8]',
        },
        // use: [
        //   {
        //     loader: IMAGEMINIMIZERPLUGIN.loader,
        //     options: {
        //       minimizerOptions: {
        //         plugins: [
        //           ['gifsicle', {
        //             interlaced: true,
        //             optimizationLevel: 3
        //           }],
        //           ['jpegtran', {
        //             progressive: true,
        //             quality: 75
        //           }],
        //           ['pngquant', {
        //             quality: [0.60, 0.75],
        //             speed: 4
        //           }]
        //           // ['svgo', {
        //           //   plugins: extendDefaultPlugins([{
        //           //     name: 'removeViewBox',
        //           //     active: false
        //           //   }])
        //           // }]
        //         ]
        //       }
        //     }
        //   }
        // ]
      },
      CONFIG.webp
        ? {
            test: /\.(jpe?g|png)$/i,
            // use: [
            //   {
            //     loader: IMAGEMINIMIZERPLUGIN.loader,
            //     options: {
            //       deleteOriginalAssets: false,
            //       filename: '[path][name].webp?[hash:8]',
            //       minimizerOptions: {
            //         plugins: [
            //           ['webp', {
            //             quality: 88
            //           }]
            //         ]
            //       }
            //     }
            //   }
            // ]
          }
        : {},
      {
        test: /\.svg$/,
        include: PATH.resolve(__dirname, `src/${CONFIG.svg}`),
        use: [
          {
            loader: 'svg-sprite-loader',
          },
          'svgo-loader',
        ],
      },
      CONFIG.fonts
        ? {
            test: /\.(woff|woff2|ttf|eot|svg)$/,
            include: PATH.resolve(__dirname, `src/${CONFIG.fonts}`),
            type: 'asset/resource',
            generator: {
              filename: '[path][name][ext]?[hash:8]',
            },
            // use: 'file-loader?name=[path][name].[ext]?[hash]'
          }
        : {},
    ],
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    // minimize: true,
    minimizer: [
      // new OptimizeCSSAssetsPlugin({
      //   cssProcessor: cssnano,
      //   cssProcessorPluginOptions: {
      //     preset: ['default', {
      //       discardComments: {
      //         removeAll: true
      //       }
      //     }]
      //   },
      //   canPrint: true
      // }),
      new CSSMINIMIZERPLUGIN({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: {
                removeAll: true,
              },
            },
          ],
        },
      }),
      new TERSERPLUGIN({
        exclude: CONFIG.jsMinifyExclude,
        extractComments: false,
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
          },
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
          },
        },
      }),
      new IMAGEMINIMIZERPLUGIN({
        include: new RegExp(CONFIG.imgs),
        minimizer: {
          implementation: IMAGEMINIMIZERPLUGIN.imageminMinify,
          options: {
            plugins: [
              [
                'gifsicle',
                {
                  interlaced: true,
                  optimizationLevel: 3,
                },
              ],
              /*
               * jpegtran 是無損最佳化，只會重排編碼、不會重新壓縮，
               * 所以這裡的 quality 其實沒有作用。JPEG 的畫質由原始檔決定
               * （目前照片一律以品質 85 匯出，帶文字的截圖 92）。
               */
              [
                'jpegtran',
                {
                  progressive: true,
                },
              ],
              /*
               * pngquant 會把 PNG 降成 256 色調色盤 —— 那是給圖形用的，
               * 拿來壓照片會壓出色帶與雜點。照片一律存成 JPEG，
               * 這裡剩下的 PNG 只有瀏覽器 icon 之類的平色圖形，
               * 品質範圍因此拉高，避免哪天有人放了照片進來又被磨掉。
               */
              [
                'pngquant',
                {
                  quality: [0.85, 0.95],
                  speed: 4,
                },
              ],
              [
                'svgo',
                {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
  plugins: extendPlugins(),
  devServer: {
    // contentBase : PATH.join(__dirname, 'dist'),
    // index            : 'index.htm',
    open: false,
    host: IP,
    hot: true,
    compress: true,
    port: CONFIG.port,
    server: CONFIG.https ? 'https' : 'http',
    https: CONFIG.https ? CONFIG.https : false,
    static: {
      directory: PATH.join(__dirname, '/'),
      serveIndex: true,
    },
    client: {
      overlay: false,
    },
    onBeforeSetupMiddleware(devServer) {
      if (!CONFIG.proxy) {
        devServer.app.post('*', (req, res) => {
          res.json({ custom: 'response' });
        });
      }
    },
    // proxy: {
    //     "/api": {
    //         target: 'https://192.168.1.155:'+CONFIG.port+'',
    //         bypass: function(req, res, proxyOptions) {
    //             if(req.method != 'POST') return false;
    //         }
    //     }
    // }
    historyApiFallback: true,
    proxy: CONFIG.proxy ? CONFIG.proxy : {},
  },
  resolve: {
    mainFields: ['main'],
    modules: resolveModules(),
    extensions: ['.js', '.vue'],
    alias: resolveAlias(),
  },
};
