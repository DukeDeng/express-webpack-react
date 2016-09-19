var path = require('path');
var webpack = require('webpack');
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

var config = {
  devtool: 'eval-source-map',
  entry: [
    //注意次序，hotMiddlewareScript应该在后面
    path.join(__dirname, 'src/component/main.jsx'),
    hotMiddlewareScript,
  ],
  resolve: {
    //require文件的时候不需要写后缀了，可以自动补全
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: 'http://localhost:3000/'
  },
  module: {
    loaders: [{
        // 如果用了es6，jsx-loader这部分需要改成这样，使用babel-loader
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),    //根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id，使得ids可预测，降低文件大小
    new webpack.HotModuleReplacementPlugin(),       //如果代码更改，自动刷新页面
    new webpack.NoErrorsPlugin()                    //报错但不退出webpack进程
  ]
};

module.exports = config;
