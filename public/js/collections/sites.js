define([
  'underscore', 
  'backbone', 
  'models/site'
  ], function(_, Backbone, Site){

  var SitesCollection = Backbone.Collection.extend({

    url: '/gato/sites',

    // Reference to this collection's model.
    model: Site,

    parse: function(results) {
      return results.sites;
    },

    // Sites are sorted by their name.
    comparator: function(site) {
      return site.get('name');
    }

  });
  return new SitesCollection();
});
