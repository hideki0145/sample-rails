const path = require("path");
const webpack = require("webpack");
const PnpWebpackPlugin = require("pnp-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const glob = require("glob");

const entryExtensions = "vue,tsx,ts,js";

const getEntries = (entryRoot) => {
  const entryName = (rootPath, filePath) => {
    const dirName = path.dirname(filePath).replace(rootPath, "");
    return `${dirName}${dirName ? "/" : ""}${
      path.basename(filePath).split(".")[0]
    }`;
  };

  const entries = {};
  glob.sync(`${entryRoot}/**/*.{${entryExtensions}}`).forEach((filePath) => {
    entries[entryName(entryRoot, filePath)] = filePath;
  });
  return entries;
};

module.exports = {
  entry: getEntries(path.resolve(__dirname, "app/javascript")),
  output: {
    filename: "[name].js",
    sourceMapFilename: "[file].map",
    path: path.resolve(__dirname, "app/assets/builds"),
  },
  module: {
    rules: [
      {
        test: /\.vue(\.erb)?$/,
        use: [
          {
            loader: "vue-loader",
          },
        ],
      },
      {
        test: /\.tsx?(\.erb)?$/,
        use: [
          {
            loader: "ts-loader",
            options: PnpWebpackPlugin.tsLoaderOptions(),
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
    extensions: entryExtensions.split(",").map((ext) => {
      return `.${ext}`;
    }),
    modules: [path.resolve(__dirname, "app/javascript"), "node_modules"],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*", "!*.css", "!.keep"],
    }),
  ],
  optimization: {
    moduleIds: "deterministic",
  },
  performance: {
    maxAssetSize: 10485760,
    maxEntrypointSize: 20971520,
  },
};
