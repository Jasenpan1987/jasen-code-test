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

module.exports = (environment, argv) => {
  const isDev = argv.mode !== "production";
  const env = envFile ? envFile : process.env;
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(process.env[next]);
    return prev;
  }, {});
  const targetPath = path.join(__dirname, "dist", "static");
  const config = {
    stats: { modules: false, performance: false },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: "./tsconfig.json"
        })
      ]
    },
    entry: {
      client: "./src/client/index.tsx"
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          use: "babel-loader",
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [{ loader: "style-loader" }, { loader: "css-loader" }]
        },
        {
          test: /\.(png|jpe?g|gif|svg|bmp)$/,
          use: {
            loader: "file-loader",
            options: { name: "images/[name].[ext]" }
          }
        }
      ]
    },
    output: {
      filename: isDev ? "[name].js" : "[name].[contenthash].js",
      path: targetPath
    },
    plugins: [
      new CaseSensitivePathsPlugin(),
      new ForkTsCheckerWebpackPlugin(),
      new webpack.IgnorePlugin(/^encoding$/, /node-fetch/),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, "public/images"),
          to: path.resolve(__dirname, "dist/static/images/")
        }
      ]),
      new webpack.DefinePlugin(envKeys)
    ],
    performance: {
      hints: false
    }
  };

  if (isDev) {
    config.devtool = "source-map";
    config.devServer = {
      contentBase: "./public",
      port: 3000,
      historyApiFallback: true
    };
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      enforce: "pre",
      loader: "tslint-loader",
      exclude: /node_modules/
    });
  } else {
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /node_modules/,
            name: "vendor",
            chunks: "all"
          }
        }
      },
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true
            }
          }
        })
      ]
    };
    config.plugins.push(
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [targetPath]
      }),
      new HtmlWebpackPlugin({
        template: "public/ssr.template",
        filename: "ssr.template"
      })
    );
  }

  return config;
};
