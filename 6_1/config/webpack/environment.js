const { environment } = require('@rails/webpacker')

environment.splitChunks();
const config = environment.toWebpackConfig();
config.performance = {
  maxAssetSize: 10485760,
  maxEntrypointSize: 20971520,
};

module.exports = environment
