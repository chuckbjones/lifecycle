// Filename: main.js

// Require.js allows us to configure mappings to paths
// as demonstrated below:
require.config({
  paths: {
    jquery: '/libs/jquery/dist/jquery',
    underscore: '/libs/underscore/underscore',
    'underscore.string': '/libs/underscore.string/lib/underscore.string',
    backbone: '/libs/backbone/backbone',
    'backbone.paginator': '/libs/backbone.paginator/lib/backbone.paginator',
    text: '/libs/requirejs-text/text'
  }

});

require(['router'],
  function(AppRouter) {
    var app_router = new AppRouter();
    Backbone.history.start();
  }
);

