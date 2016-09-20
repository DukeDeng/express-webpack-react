var path = require('path');
var express = require('express');
var compression = require('compression');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config.js');

var app = express();
var compiler = webpack(config);

app.use(compression());
app.use(webpackMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));

// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

app.use(express.static(__dirname + '/dist'));

app.listen(3000);
