
var path                = require('path'),
    gulp                = require('gulp'),
    gutil               = require('gulp-util'),
    webpack             = require('webpack'),
    ExtractTextPlugin   = require('extract-text-webpack-plugin')

require('babel/register')


// --------------------------------------------------------------------


function buildJs(options, callback) {

  let plugins = []

  if (options.production) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },

      output: {
        comments: false,
        semicolons: true
      }
    }))
  }

  webpack({
    entry: path.join(__dirname, 'src', 'shell.js'),

    bail: !options.watch,
    watch: options.watch,

    devtool: 'source-map',

    plugins: plugins,

    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: 'shell.js'
    },

    module: {
      preLoaders: [
        {
          loader: 'eslint',
          test: /\.js$/,
          include: [ 'src' ]
        }
      ],
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          include: [ path.join(__dirname, 'src') ]
        },
        {
          test: /\.styl$/,
          loader: 'style!css!stylus',
          include: [ path.join(__dirname, 'src') ]
        },
        {
          test: /\.css$/,
          loader: 'style!css',
          include: [ path.join(__dirname, 'src') ]
        },
        {
          test: /\.(woff|woff2|ttf|eot|svg)(\?]?.*)?$/,
          loader: 'file-loader?name=res/[name].[ext]?[hash]'
        },
        {
          loader: 'jade',
          test: /\.jade$/,
          include: [ path.join(__dirname, 'src') ]
        },
        {
          loader: 'raw',
          test: /\.html$/,
          include: [ path.join(__dirname, 'src') ]
        },
        {
          loader: 'json',
          test: /\.json$/
        }
      ]
    }
  }, function(error, stats) {
    if (error) {
      let pluginError = new gutil.PluginError('webpack', error)

      if (callback) {
        callback(pluginError)
      }
      else {
        gutil.log('[webpack]', pluginError)
      }

      return
    }

    gutil.log('[webpack]', stats.toString())

    if (callback) {
      callback()
    }
  })

}

gulp.task('build:dev', done => {
  buildJs({
    production: false,
    watch: false
  }, done)
})


gulp.task('build:live', done => {
  buildJs({
    production: true,
    watch: false
  }, done)
})


gulp.task('watch', () => {
  buildJs({
    production: false,
    watch: true
  })
})


gulp.task('default', ['watch'])
