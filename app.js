'use strict';
/**
 * Module dependencies.
 */
var express = require('express');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var bodyParser = require('body-parser');
var cons = require('consolidate');
var errorHandler = require('errorhandler');

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
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
	secret: 'don\'t let him know',
	resave: false
}));

//app.use(express.Router());
app.use(express.static(path.join(__dirname, 'public')));
//add doc folder
app.use('/android', express.static(path.join(__dirname, '..', 'sdk', 'docs')));
app.use('/angularjs', express.static('/Users/liujing/myproject/angularJS/angular-1.2.13'));

(function(){
	function sendHtml(req, res){
		res.sendfile(path.join('/Users/liujing/myproject/3rd-party/angularJS/angular-1.3.16', 'docs','index.html'));
	}
	app.route('/angularjs1.3/docs/api').get(sendHtml);
	app.route('/angularjs1.3/docs/api/*').get(sendHtml);
	app.route('/angularjs1.3/docs/guide/*').get(sendHtml);
})();

app.use('/angularjs1.3', express.static('/Users/liujing/myproject/3rd-party/angularJS/angular-1.3.16'));
app.use('/yui3', express.static('/Users/liujing/myproject/3rd-party/yui_3.12.0'));
app.use('/antlr3', express.static('/Users/liujing/myproject/3rd-party/antlr-3.3/api-doc'));
app.use('/java7', express.static('/Users/liujing/doc/jdk7doc/docs'));
app.use('/javatu', express.static('/Users/liujing/doc/javatutorial/tutorial'));
app.use('/jedit', express.static('/Applications/jEdit.app/Contents/Resources/Java/doc/api'));
app.use('/ik', express.static('/Users/liujing/myproject/ikisspower/presentation01'));
app.get('/ik', function(req, res){
    res.sendfile('/Users/liujing/myproject/ikisspower/presentation01/index.html');
});
app.use('/ik2', express.static('/Users/liujing/myproject/ikisspower/presentation02'));
app.get('/ik2', function(req, res){
    res.sendfile('/Users/liujing/myproject/ikisspower/presentation02/index.html');
});
//app.use('/test', express.static(path.join(__dirname, 'test')));
// development only

app.get('/', function(req, res){
    res.sendfile(path.join(__dirname, 'public','index.html'));
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
    		console.log(err);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
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

