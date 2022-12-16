const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const EslingPlugin = require("eslint-webpack-plugin");

module.exports = {
  entry: {
    e: "./src/pages/index.ts",
    main: "./src/pages/home.ts",
    test: "./src/pages/test.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    compress: true,
    port: 8080,
    open: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
        },
        exclude: "/node_modules/",
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
        // loader: "file-loader",
        // options: {
        //   name: "[name].[ext]",
        // },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: `index.html`,
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new EslingPlugin({ extensions: "ts" }),
  ],
};
