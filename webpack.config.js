

var path                = require('path'),
    webpack             = require('webpack'),
    ExtractTextPlugin   = require('extract-text-webpack-plugin')


// --------------------------------------------------------------------

module.exports = {

  debug: true,
  context: path.join(__dirname, 'src'),

  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './shell'
  ],

  output: {
    path: path.join(__dirname, 'build/js'),
    publicPath: '/js/',
    filename: 'shell.js'
  },

  devtool: 'source-map',

  /*resolve: {
    root: path.resolve(__dirname, 'src')
  },*/

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules|bower_modules/,
        loader: 'eslint'
      }
    ],

    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules|bower_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?]?.*)?$/,
        loader: 'file-loader?name=res/[name].[ext]?[hash]'
      },
      {
        test: /\.html$/,
        loader: 'raw'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('shell.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  eslint: {
    configFile: '.eslintrc'
  }
}
