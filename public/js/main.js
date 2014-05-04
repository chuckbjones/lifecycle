// Filename: main.js

// Require.js allows us to configure mappings to paths
// as demonstrated below:
require.config({
  paths: {
    jquery: '/libs/jquery/dist/jquery',
    underscore: '/libs/underscore/underscore',
    backbone: '/libs/backbone/backbone',
    'backbone-pageable': '/libs/backbone-pageable/lib/backbone-pageable',
    text: '/libs/requirejs-text/text'
  },

  shim: {

    underscore: {
      exports: '_'
    },

    backbone: {
      deps: [ 'underscore', 'jquery' ],
      exports: 'Backbone'
    }
  }

});

require([ 
  'views/app', 
  'views/pagination',
  'collections/sites'
  ], function(AppView, PaginationView, AppCollection) {
  var app_view = new AppView({
    collection: AppCollection
  });
  var pagination_view = new PaginationView({
    collection: AppCollection
  });
});

