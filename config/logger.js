var nconf = require('../config');
var winston = require('winston');
var expressWinston = require('express-winston'); 
var fs = require('fs');
var path = require('path');

var config = nconf.get('log');

if (!config.file.silent) {
  if (!fs.existsSync(path.dirname(config.file.filename))) {
    fs.mkdirSync(path.dirname(config.file.filename), 0755);
  }
}

var transports = [
  new (winston.transports.Console)(config.console),
  new (winston.transports.File)(config.file)
];

exports.transports = transports;

exports.logger = new (winston.Logger)({
  transports: transports
});

exports.requestLogger = expressWinston.logger({
  transports: transports,
  meta: true
});

exports.errorLogger = expressWinston.errorLogger({
  transports: transports
});


