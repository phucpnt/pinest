/* eslint-disable */
const { getConfig, applyEntries, getBaseConfig } = require('./webpack.config.base');
const { join } = require('path');
/* eslint-enable */

const PORT = 4445;

const webConfig = getConfig(getBaseConfig('web'), {
  target: 'web',

  devServer: {
    contentBase: join(__dirname, 'build'),
    port: PORT,
    hot: true,
    inline: true,
    disableHostCheck: true,

    historyApiFallback: {
      rewrites: [
        { from: /^\/_invest.html/, to: '/_invest.html' },
      ]
    }
  },

  externals: { electron: 'require("electron")' },
});

applyEntries('web', webConfig, ['_invest', 'settings', 'history', 'newtab', 'bookmarks']);

module.exports = webConfig;
