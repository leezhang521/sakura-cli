var webpack = require('webpack')
var path = require('path')
var fs = require('fs')
var sakuraConfig = require('./sakura.config.json');
module.exports = {
  entry: Object.keys(sakuraConfig.entry).reduce((pre, key) => {
    return Object.assign(pre, {
      [key]: path.resolve(__dirname, sakuraConfig.entry[key])
    })
  }, {}),
  resolve: {
    extensions: ['.web.js', '.js', '.json'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "[name].js",
    publicPath: "/dist/"
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "images/[name]-[hash].[ext]",
          }
        }]
      },
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=fonts/[name]-[hash].[ext]'
      }
    ]
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  devtool: 'source-map'
}


