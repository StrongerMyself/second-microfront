const rimraf = require('rimraf')
const path = require('path')
// const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const PATH_DIST = path.resolve(__dirname, 'dist')
rimraf.sync(PATH_DIST)
console.log('Clean dist: ', PATH_DIST)

const venderConfig = {
  target: 'web',
  entry: {
    vendor: './src/scripts/vendor.js'
  },
  output: {
    publicPath: '',
    path: PATH_DIST,
    filename: '[name].js'
    // filename: '[name].[contenthash].js'
  },
  plugins: [
    // new WebpackManifestPlugin(),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({ extractComments: false })
    ]
  },
}

module.exports = [ venderConfig ]
