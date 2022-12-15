const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
    cacheDirectory: path.resolve(__dirname, "tmp/cache/webpack"),
  },
});
