const rimraf = require('rimraf')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const PATH_DIST = path.resolve(__dirname, 'dist')
rimraf.sync(PATH_DIST)
console.log('Clean dist: ', PATH_DIST)

const venderConfig = {
  target: 'web',
  entry: {
    main: './src/scripts/main.js',
    vendor: './src/scripts/vendor.js',
  },
  output: {
    publicPath: '',
    path: PATH_DIST,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({ extractComments: false })
    ]
  },
}

module.exports = [ venderConfig ]
