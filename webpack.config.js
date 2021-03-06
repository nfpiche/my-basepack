const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineManifestWebpackPlugin = require("@insanecoding/inline-manifest-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const parts = require("./webpack.parts");

const PATHS = {
  app: path.join(__dirname, "src"),
  build: path.join(__dirname, "dist"),
};

const envPath = path.join(__dirname, `.env.${process.env.NODE_ENV}`);
const envVars = dotenv.config({ path: envPath }).parsed;

const production = merge([
  {
    entry: [ PATHS.app ],
  },
  {
    output: {
      chunkFilename: "[name].[chunkhash:8].js",
      filename: "[name].[chunkhash:8].js",
      publicPath: process.env.PUBLIC_PATH,
    },
  },
  parts.extractCSS(),
  parts.clean(PATHS.build),
  parts.minifyJS(),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: false,
      },
      safe: true,
    },
  }),
  {
    optimization: {
      splitChunks: {
        chunks: "initial",
      },
      runtimeChunk: {
        name: "manifest",
      },
    },
  },
  {
    plugins: [new InlineManifestWebpackPlugin("manifest")],
  },
]);

const development = merge([
  parts.devServer,
  parts.loadCSS(),
  {
    plugins: [new webpack.HotModuleReplacementPlugin()],
  },
]);

const envs = {
  production,
  development,
};

module.exports = (mode, opts = {}) => {
  const common = merge([
    {
      plugins: [
        new HtmlWebpackPlugin({
          title: "BASEPACK",
          template: path.join(__dirname, "src/index.html"),
          ...envVars,
        }),
      ],
    },
    parts.loadJS({ include: PATHS.app }),
    parts.setEnvironmentVariables(envVars),
    opts.env && opts.env.shouldAnalyze ? { plugins: [new BundleAnalyzerPlugin()] } : {},
  ]);

  return merge(common, envs[opts.mode], { mode: opts.mode });
};
