define([
  'underscore', 
  'backbone', 
  'backbone-pageable', 
  'models/site'
  ], function(_, Backbone, BackbonePageable, Site){

  var SitesCollection = Backbone.PageableCollection.extend({
    mode: 'client',

    url: '/gato/sites',

    // Reference to this collection's model.
    model: Site,

    state: {
      pageSize: 10
    },

    // Sites are sorted by their name.
    comparator: function(site) {
      return site.get('name');
    }

  });
  return new SitesCollection();
});
