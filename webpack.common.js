const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: 'inline-source-map',
  entry: {
    main: "./src/index.ts"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contentHash].bundle.js",
    chunkFilename: "[name].[contentHash].bundle.js",
    // publicPath: '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
       vendor: {
        test: /node_modules/,
        chunks: 'initial',
        name: 'vendor',
        enforce: true
       },
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs"
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
};