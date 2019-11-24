const path = require("path");

// plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: {
    guest: path.resolve(__dirname, "src/apps/guest/index.js"),
    host: path.resolve(__dirname, "src/apps/host/index.js")
  },
  output: {
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    alias: {
      svelte: path.resolve("node_modules", "svelte")
    },
    extensions: [".mjs", ".js", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"]
  },
  module: {
    rules: [
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[contenthash].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new Dotenv(),
    new CopyWebpackPlugin([{ from: path.resolve(__dirname, "public") }]),
    new HtmlWebpackPlugin({
      filename: "host.html",
      template: path.resolve(__dirname, "src/apps/host/index.html"),
      inject: true,
      chunks: ["vendors", "host"]
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/apps/guest/index.html"),
      inject: true,
      chunks: ["vendors", "guest"]
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "vendors",
          chunks: "all"
        }
      }
    }
  }
};
