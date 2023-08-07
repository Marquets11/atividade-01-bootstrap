const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    compress: true,
    port: 8000,
  },
  entry: {
    bundle: "./src/js/index.js",
  },
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].min.js",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
          },
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        type: "asset/resource",
        generator: {
          filename: "imgs/[name][ext]",
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      chunks: ["bundle"],
      filename: "index.html",
    }),
  ],
};
