var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var env = require('yargs').argv.env;

var libraryName = 'react_filter_picker';

var plugins = [], outputFile;

if (env.mode === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

const config = {
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.js)$/,
        use: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.js)$/,
        use: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader/url' },
          { loader: 'file-loader', options: {name: 'react-filter-picker.css'}}
        ]
      }
    ]
  },
  externals: {
    'react': 'react',
    'prop-types': 'prop-types'
  },
  resolve: {
    modules: [
      path.resolve('./src')
    ],
    extensions: ['.js']
  },
  plugins: plugins
};

module.exports = config;
