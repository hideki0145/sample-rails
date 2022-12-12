const { environment } = require('@rails/webpacker')

environment.splitChunks();
const config = environment.toWebpackConfig();
config.performance = {
  maxAssetSize: 10485760,
  maxEntrypointSize: 20971520,
};
config.resolve.alias = {
  vue$: "vue/dist/vue.esm.js",
};

const erb = require("./loaders/erb");
environment.loaders.prepend("erb", erb);

const typescript = require("./loaders/typescript");
environment.loaders.prepend("typescript", typescript);

const { VueLoaderPlugin } = require("vue-loader");
const vue = require("./loaders/vue");
environment.plugins.prepend("VueLoaderPlugin", new VueLoaderPlugin());
environment.loaders.prepend("vue", vue);

module.exports = environment
