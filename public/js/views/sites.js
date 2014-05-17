define([
  'jquery',
  'underscore', 
  'backbone',
  'views/pagination',
  'views/site',
  'text!templates/sites.html',
  'text!templates/stats.html'
  ], function($, _, Backbone, PaginationView, SiteView, sitesTemplate, statsTemplate){
  var SitesView = Backbone.View.extend({

    // Our template for the main site list.
    sitesTemplate: _.template(sitesTemplate),

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: _.template(statsTemplate),
    
    // Delegated events for creating new items, and clearing completed ones.
    events: {
      // "keypress #new-todo":  "createOnEnter",
      // "keyup #new-todo":     "showTooltip",
      // "click .todo-clear a": "clearCompleted"
    },

    // At initialization we listen to the relevant events on the `Sites`
    // collection, when items are added or changed. This collection is
    // passed on the constructor of this SitesView. Kick things off by
    // loading any preexisting sites from the db.
    initialize: function(options) {
      this.siteTemplate = _.template(options.siteTemplate);
      this.tableHeaderTemplate = _.template(options.tableHeaderTemplate);

      this.$el.html(this.sitesTemplate({
        title: this.collection.title(),
        table_header: this.tableHeaderTemplate()
      }));
      $('#lifecycleapp').html(this.el);

      this.input    = this.$("#new-site");
      
      this.paginationView = new PaginationView({ collection: this.collection });

      this.listenTo(this.collection, 'add', this.addOne);
      this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(this.collection, 'all', this.render);

      this.collection.fetch();
    },

    render: function() {
      this.$('#footer').html(this.statsTemplate({
        total:      this.collection.state.totalRecords
      }));
    },

    close: function() {
      this.undelegateEvents();
      this.paginationView.close();
      this.remove();
    },

    // Add a single site item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(site) {
      var view = new SiteView({template: this.siteTemplate, model: site});
      this.$('#site-list > tbody').append(view.render().el);
    },

    // Add all items in the **Sites** collection at once.
    addAll: function() {
      this.$('#site-list > tbody').empty();
      this.collection.each(this.addOne, this);
    },

    // Generate the attributes for a new site.
    newAttributes: function() {
      return {
        name: this.input.val()
      };
    },

    // If you hit return in the main input field, create new **Site** model,
    // persisting it to the db.
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      this.collection.create(this.newAttributes());
      this.input.val('');
    },

    // Lazily show the tooltip that tells you to press `enter` to save
    // a new site, after one second.
    showTooltip: function() {
      var tooltip = this.$('.ui-tooltip-top'),
          val = this.input.val(),
          show;
      tooltip.fadeOut();
      if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
      if (val === '' || val === this.input.attr('placeholder')) return;
      show = function(){ tooltip.show().fadeIn(); };
      this.tooltipTimeout = _.delay(show, 1000);
    }

  });
  return SitesView;
});
