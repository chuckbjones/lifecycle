var nconf = require('nconf');
var log = require('winston');

nconf.env().argv();

var env = nconf.get('NODE_ENV') || /* istanbul ignore next */ 'development';
nconf.file('./config/'+env+'.json');

var logfile = './log/'+env+'.log';

nconf.defaults({
  port : 3000,
  database : 'localhost/lifecycle',
  log : { 
    console : {
      level : 'info',
      colorize : true,
      json : false
    },
    file : {
      filename : logfile, 
      level : 'verbose',
      colorize : false,
      json : false
    }
  }
});

module.exports = nconf;
