const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const envFile = require("dotenv").config().parsed;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const getEnvKeys = () => {
  const env = envFile ? envFile : process.env;
  return Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(process.env[next]);
    return prev;
  }, {});
};

module.exports = (environment, argv) => {
  const isDev = argv.mode !== "production";
  const env = envFile ? envFile : process.env;
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(process.env[next]);
    return prev;
  }, {});
  const targetPath = path.join(__dirname, "dist");
  const config = {
    stats: {
      modules: false,
      warningsFilter: /^(?!CriticalDependenciesWarning$)/
    },
    target: "node",
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: "./tsconfig.json"
        })
      ],
      mainFields: ["main", "module"]
    },
    entry: {
      index: path.resolve(__dirname, "src", "server", "index.tsx")
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          use: "babel-loader",
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpe?g|gif|svg|bmp)$/,
          use: {
            loader: "file-loader",
            options: { name: "images/[name].[ext]" }
          }
        },
        {
          type: "javascript/auto",
          test: /\.mjs$/,
          use: []
        },
        {
          test: /\.css$/,
          use: [
            "to-string-loader",
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: "./public",
                hmr: process.env.NODE_ENV === "development"
              }
            },
            "css-loader"
          ]
        }
      ]
    },
    output: {
      filename: "[name].js",
      path: path.join(__dirname, "dist"),
      libraryTarget: "commonjs"
    },
    plugins: [
      new CaseSensitivePathsPlugin(),
      new webpack.IgnorePlugin(/^encoding$/, /node-fetch/),
      new ForkTsCheckerWebpackPlugin(),
      new webpack.DefinePlugin(getEnvKeys())
    ]
  };

  return config;
};
