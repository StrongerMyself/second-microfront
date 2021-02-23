const rimraf = require('rimraf')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const packageJson = require('./package.json') 

const PATH_DIST = path.resolve(__dirname, 'dist')
rimraf.sync(PATH_DIST)
console.log('Clean dist: ', PATH_DIST)

const publicPath = `/static/${packageJson.name}`

const seedManifest = {}
const manifestPlugin = new WebpackManifestPlugin({
  publicPath: '',
  seed: seedManifest,
})

const rules = [
  {
    test: /\.css$/i,
    use: [
      MiniCssExtractPlugin.loader,
      // 'vue-style-loader',
      'css-loader',
    ],
  },
  {
    test: /\.(vue)$/,
    use: ['vue-loader'],
  },
  {
    test: /\.(js)$/,
    use: ['babel-loader'],
  },
  {
    test: /\.(ts)$/,
    use: ['ts-loader'],
  },
  {
    test: /\.(png|jpe?g|gif|ico)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  },
]

const resolve = {
  extensions: ['.tsx', '.ts', '.js'],
}

const minimizer = [
  new TerserPlugin({ extractComments: false })
]

const serverConfig = {
  target: 'node',
  entry: {
    server: './src/server.ts'
  },
  output: {
    publicPath,
    path: PATH_DIST,
    filename: '[name].[contenthash].js',
    libraryTarget: 'commonjs2',
    libraryExport: 'default',
  },
  plugins: [
    manifestPlugin,
    new VueLoaderPlugin(),
  ],
  externals: [
    nodeExternals(),
  ],
  resolve,
  module: { rules },
  optimization: { minimizer },
}

const clientConfig = {
  target: 'web',
  entry: {
    client: './src/client.ts'
  },
  output: {
    publicPath,
    path: PATH_DIST,
    filename: '[name].[contenthash].js'
  },
  plugins: [
    manifestPlugin,
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  externals: {
    vue: 'Vue',
  },
  resolve,
  module: { rules },
  optimization: { minimizer },
}

module.exports = [ serverConfig, clientConfig ]
