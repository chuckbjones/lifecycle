var nconf = require('./config');
var logger = require('./config/logger');
var log = logger.logger;

var monk = require('monk');

var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var sites = require('./routes/site');

var app = express();

var db = monk(nconf.get('database'));
app.set('db', db);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger.requestLogger);

/// Save off variables needed by all requests
app.use(function(req, res, next) {
  req.db = db;
  return next();
});

/// Route definitions
app.use(app.router);
app.get('/', routes.index);
app.get('/:service/sites', sites.list);
app.get('/:service/site/:id', sites.show);
app.post('/:service/site', sites.create);
app.put('/:service/site/:id', sites.update);
app.del('/:service/site/:id', sites.destroy);

// anything not matched by a route above,
// set status 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not found.');
  err.status = 404;
  next(err);
});

/// error handlers

// log errors 
app.use(logger.errorLogger);

// development error handler
// will print stacktrace
/* istanbul ignore if */
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({ error : err.stack });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({ error : err.message });
});


module.exports = app;