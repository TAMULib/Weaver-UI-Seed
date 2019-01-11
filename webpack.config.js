var path = require('path');
var webpack = require('webpack');

var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname),
  mode: 'production',
  entry: {
    app: './app/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(ttf|eot|svg|wpf|woff|woff2|gif|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'file-loader'
        }]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, 'app')],
        exclude: [path.resolve(__dirname, 'app/node_modules')]
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./app'),
      path.resolve('./node_modules'),
      path.resolve('./node_modules/weaver-ui-core/')
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      "window.jQuery": 'jquery',
      bootstrap: 'bootstrap'
    }),
    new CopyWebpackPlugin([
      { from: 'app/index.html'},
      { from: 'app/.htaccess'},
      { from: 'app/views', to: 'views'},
      { from: 'app/resources', to: 'resources'},
      { from: 'node_modules/weaver-ui-core/app/views', to: 'node_modules/weaver-ui-core/app/views'},
      { from: 'node_modules/weaver-ui-core/app/resources', to: 'node_modules/weaver-ui-core/app/resources'}
    ])
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },

  node: {
    fs: 'empty'
  }
};