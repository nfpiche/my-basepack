/* DEVSERVER */
exports.devServer = {
  devServer: {
    host: process.env.HOST,
    port: process.env.PORT,
    stats: "errors-only",
    overlay: true,
    historyApiFallback: true,
  },
};

/* CSS LOADERS */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const cssnano = require("cssnano");
const postcssPresetEnv = require("postcss-preset-env");
const precss = require("precss");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const commonCSS = [
  {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: "[local]---[hash:base64:5]",
      },
    },
  },
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: [precss, postcssPresetEnv],
      },
    },
  },
];

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader"].concat(commonCSS),
        include,
        exclude,
      },
    ],
  },
});

exports.extractCSS = ({ include, exclude } = {}) => {
  const plugin = new MiniCssExtractPlugin({
    filename: "[name].[contenthash:4].css",
  });

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader].concat(commonCSS),
          include,
          exclude,
        },
      ],
    },
    plugins: [plugin],
  };
};

exports.minifyCSS = ({ options }) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false,
    }),
  ],
});

/* JS LOADERS */
exports.loadJS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        include,
        exclude,
      },
    ],
  },
});

exports.minifyJS = () => ({
  optimization: {
    minimizer: [new TerserWebpackPlugin()],
  },
});

/* GENERAL LOADERS */
exports.clean = (path) => ({
  plugins: [new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: path })],
});

const webpack = require("webpack");

exports.setEnvironmentVariables = (envVars) => {
  if (!envVars) return {};

  const env = Object.entries(envVars).reduce(
    (acc, [key, val]) => ({ ...acc, [`GLOBAL.${key}`]: JSON.stringify(val) }),
    {}
  );

  return {
    plugins: [new webpack.DefinePlugin(env)],
  };
};
