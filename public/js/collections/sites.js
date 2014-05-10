define([
  'underscore', 
  'underscore.string',
  'backbone', 
  'backbone.paginator', 
  'models/site'
  ], function(_, _s, Backbone, BackbonePaginator, Site){

  var SitesCollection = Backbone.PageableCollection.extend({
    mode: 'client',

    service: 'gato', //default. override in constructor.

    url: function() { return '/' + this.service + '/sites'; },

    title: function() { return _s.titleize(this.service) + ' Sites'; },

    // Reference to this collection's model.
    model: Site,

    state: {
      pageSize: 10
    },

    // Sites are sorted by their name.
    comparator: function(site) {
      return site.get('name');
    },

    initialize: function(models, options) {
      if (options && options['service']) {
        this.service = options['service'];
      }
    }

  });
  return SitesCollection;
});
