define(['underscore', 'backbone'], function(_, Backbone) {
  var SiteModel = Backbone.Model.extend({

    // mongodb uses _id for ids.
    idAttribute: "_id",

    // Default attributes for the site.
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

    // Remove this Site from the remote db
    clear: function() {
      this.destroy();
    }

  });
  return SiteModel;
});
