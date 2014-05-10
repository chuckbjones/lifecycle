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
  'views/calendar/sites', 
  'views/pagination',
  'collections/sites'
  ],
  function(SitesView, PaginationView, SitesCollection) {
    var app_collection = new SitesCollection([], { service: 'calendar' });
    var app_view = new SitesView({
      collection: app_collection
    });
    var pagination_view = new PaginationView({
      collection: app_collection
    });
  }
);

