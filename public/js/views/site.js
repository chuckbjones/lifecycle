define([
  'jquery', 
  'underscore', 
  'backbone',
  'text!templates/sites.html'
  ], function($, _, Backbone, sitesTemplate){
  var SiteView = Backbone.View.extend({

    //... is a tr tag.
    tagName:  'tr',

    // Cache the template function for a single item.
    template: _.template(sitesTemplate),

    // The DOM events specific to an item.
    events: {
      // "dblclick tr.site-content" : "edit",
      // "click span.site-destroy"   : "clear",
      // "keypress .todo-input"      : "updateOnEnter",
      // 'blur input': 'close'
    },

    // The SiteView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Site** and a **SiteView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      // in case the model is destroyed via a collection method
      // and not by a user interaction from the DOM, the view
      // should remove itself
      this.listenTo(this.model, 'destroy', this.remove);
    },

    // Re-render the contents of the site.
    // FIXME: To avoid XSS, use underscore's "<%-" syntax in template to set the contents.
    render: function() {
      //FIXME: is there a better way to send modified values to the template?
      var data = this.model.toJSON();
      data.manager_names = this.manager_names();
      data.abbrev_comments = this.abbrev_comments();
      this.$el.html(this.template(data));
      this.cacheInput();
      return this;
    },

    cacheInput: function() {
      this.$input = this.$('.site-input');
    },

    manager_names: function() {
      var managers = this.model.get('managers');
      if (!managers) return '-';
      return _.pluck(managers, 'name').join(', ');
    },

    abbrev_comments: function() {
      //FIXME: move this into a generic utility function
      var str = this.model.get('comments');
      var len = 50;
      if (str && str.length > len) {
          return str.substring(0, len - 3) + '...';
        } else {
          return str;
      }
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      this.$el.addClass('editing');
      this.$input.focus();
    },

    // Close the `"editing"` mode, saving changes to the site.
    close: function() {
      this.model.save({content: this.$input.val()});
      this.$el.removeClass('editing');
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

    // Remove this view from the DOM.
    // Remove event listeners from: DOM, this.model
    remove: function() {
      this.stopListening();
      this.undelegateEvents();
      this.$el.remove();
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.clear();
    }

  });
  return SiteView;
});
