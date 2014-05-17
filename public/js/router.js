define([
  'jquery',
  'underscore', 
  'backbone'
  ], function($, _, Backbone){
  var AppRouter = Backbone.Router.extend({
    services: ['calendar', 'connect', 'digital_sign', 'gato', 'portfolio', 'signup', 'tracs'],
       
    initialize: function(options) {
      _.each(this.services, function(service) {
        this.route(service + "/sites", service+"-sites", function() { 
          this.displaySites(service);
        });
        this.route(service + "/customers", service+"-customers", function() { 
          this.displayCustomers(service);
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

    displayCustomers: function(service) { 
      var loadView = _.bind(this.loadView, this);
      require([ 
        'text!templates/'+service+'/customer_header.html',
        'text!templates/'+service+'/customer.html',
        'views/customers',
        'collections/customers'
        ],
        function(tableHeaderTemplate, customerTemplate, CustomersView, CustomersCollection) {
          loadView(new CustomersView({
            tableHeaderTemplate: tableHeaderTemplate,
            customerTemplate: customerTemplate,
            collection: new CustomersCollection([], { service: service })
          }));            
        }
      );
    },

    displaySites: function(service) { 
      var loadView = _.bind(this.loadView, this);
      require([ 
        'text!templates/'+service+'/table_header.html',
        'text!templates/'+service+'/site.html',
        'views/sites',
        'collections/sites'
        ],
        function(tableHeaderTemplate, siteTemplate, SitesView, SitesCollection) {
          //SitesView = ServiceSitesView ? ServiceSitesView : SitesView;
          loadView(new SitesView({
            tableHeaderTemplate: tableHeaderTemplate,
            siteTemplate: siteTemplate,
            collection: new SitesCollection([], { service: service })
          }));            
        }
      );
    }
  });
  return AppRouter;
});
