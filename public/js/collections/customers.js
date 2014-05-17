define([
  'underscore', 
  'underscore.string',
  'backbone', 
  'backbone.paginator', 
  'models/customer'
  ], function(_, _s, Backbone, BackbonePaginator, Customer){

  var CustomersCollection = Backbone.PageableCollection.extend({
    mode: 'client',

    service: 'gato', //default. override in constructor.

    url: function() { return '/' + this.service + '/customers'; },

    title: function() { return _s.titleize(this.service) + ' Customers'; },

    // Reference to this collection's model.
    model: Customer,

    state: {
      pageSize: 10
    },

    // Customers are sorted by their name.
    comparator: function(customer) {
      return customer.get('name');
    },

    initialize: function(models, options) {
      if (options && options['service']) {
        this.service = options['service'];
      }
    }

  });
  return CustomersCollection;
});
