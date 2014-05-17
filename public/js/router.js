define([
  'jquery',
  'underscore', 
  'backbone'
  ], function($, _, Backbone){
  var AppRouter = Backbone.Router.extend({
    services: ['gato', 'calendar'],
       
    initialize: function(options) {
      _.each(this.services, function(service) {
        this.route(service + "/sites", service+"-sites", function() { 
          this.displaySites(service);
        });
      }, this);

      this.route('', 'default-route', function() {
        this.displaySites(this.services[0]);
      })
    },

    loadView : function(view) {
      this.view && (this.view.close ? this.view.close() : this.view.remove());
      this.view = view;
    },

    displaySites: function(service) { 
        var loadView = _.bind(this.loadView, this);
        require([ 
          'views/'+service+'/sites', 
          'collections/sites'
          ],
          function(SitesView, SitesCollection) {
            loadView(new SitesView({
              collection: new SitesCollection([], { service: service })
            }));            
          }
        );
      }
  });
  return AppRouter;
});
