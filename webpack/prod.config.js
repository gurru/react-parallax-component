var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var csswring = require('csswring');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index',
  ],

  output: {
    filename: 'ParallaxComponent.min.js',
    path: path.join(__dirname, '../dist/'),
    publicPath: 'dist/',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
      __DEVELOPMENT__: false,
    }),
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
    }),
  ],

  resolve: {
    extensions: ['', '.jsx', '.js', '.json'],
    modulesDirectories: ['node_modules', 'src'],
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel?stage=0&loose[]=es6.modules'],
      exclude: /node_modules/,
    }, {
      test: /\.scss$/,
      loader: 'css?localIdentName=[path]!postcss-loader!sass',
    }, {
      test: /\.png$/,
      loader: 'file?name=[name].[ext]',
    }, {
      test: /\.jpg$/,
      loader: 'file?name=[name].[ext]',
    }],
  },

  postcss: function() {
    return [autoprefixer({ browsers: ['last 2 versions', 'safari 5', 'ie 9', 'ios 6', 'android 4'] }), csswring];
  },
};