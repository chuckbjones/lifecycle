define(['underscore', 'backbone'], function(_, Backbone) {
  var CustomerModel = Backbone.Model.extend({

    // mongodb uses _id for ids.
    idAttribute: "_id",

    // Default attributes for the customer.
    // defaults: {
    //   name: 'empty name...',
    //   done: false
    // },

    // Ensure that each todo created has `content`.
    initialize: function() {
      // if (!this.get('content')) {
      //   this.set({'content': this.defaults.content});
      // }
    },

    // Remove this Customer from the remote db
    clear: function() {
      this.destroy();
    }

  });
  return CustomerModel;
});
