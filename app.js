'use strict';
/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var util = require('util');

var app = express();
var adpDocs = path.join(__dirname, '..', 'sdk', 'docs');
// all environments
app.set('port', process.env.PORT || 19819);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
//add doc folder
app.use('/android', express.static(path.join(__dirname, '..', 'sdk', 'docs')));
app.use('/angularjs', express.static('/Users/liujing/myproject/angularJS/angular-1.2.13'));
app.use('/yui3', express.static('/Users/liujing/myproject/yui_3.12.0'));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res){
    res.sendfile(path.join(__dirname, 'public','index.html'));
});

var server = http.createServer(app);
server.on('error', function(e){
		console.log("server error:"+ util.inspect(e));
		console.log("server error:"+ JSON.stringify(e, null, '  '));
		console.log(e.toString());
});
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

