const rimraf = require('rimraf')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const nodeExternals = require('webpack-node-externals');

const PATH_DIST = path.resolve(__dirname, 'dist')
rimraf.sync(PATH_DIST)
console.log('Clean dist: ', PATH_DIST)

const seedManifest = {}
const manifestPlugin = new WebpackManifestPlugin({
  seed: seedManifest,
})

const rules = [
  {
    test: /\.css$/i,
    use: [MiniCssExtractPlugin.loader, 'css-loader'],
  },
  {
    test: /\.(js)$/,
    exclude: /node_modules/,
    use: ['babel-loader'],
  },
  {
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
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
    server: './src/index.ts'
  },
  output: {
    publicPath: '',
    path: PATH_DIST,
    filename: '[name].[contenthash].js',
    libraryTarget: 'commonjs2',
    libraryExport: 'default',
  },
  plugins: [
    manifestPlugin,
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
    publicPath: '',
    path: PATH_DIST,
    filename: '[name].[contenthash].js'
  },
  plugins: [
    manifestPlugin,
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  externals: [
    'react',
    'react-dom',
  ],
  resolve,
  module: { rules },
  optimization: { minimizer },
}

module.exports = [ serverConfig, clientConfig ]
