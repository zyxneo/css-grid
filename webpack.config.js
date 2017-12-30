const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: '/docs/',
    historyApiFallback: {
      disableDotRule: true
    },
    hot: true,
    open: true
  },
  devtool: 'source-map',
  entry: [
    './src/index.js'
  ],
  resolve: {
    extensions: ['.js', '.scss'],
    modules: [
      __dirname,
      path.resolve(__dirname),
      path.resolve(__dirname, 'node_modules')
    ]
  },
  output: {
    path: path.join(__dirname, 'docs'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          // resolve-url-loader may be chained before sass-loader if necessary
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 1, // https://github.com/webpack-contrib/css-loader#importloaders
                modules: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
};
