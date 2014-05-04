define([
  'jquery', 
  'underscore', 
  'backbone',
  'text!templates/pagination.html'
  ], function($, _, Backbone, paginationTemplate){
  var PaginationView = Backbone.View.extend({

    //... is a nav tag.
    tagName:  'nav',

    // Cache the template function for the page links.
    template: _.template(paginationTemplate),

    // The DOM events specific to page link.
    events: {
      'click a.servernext': 'nextResultPage',
      'click a.serverprevious': 'previousResultPage',
      'click a.serverlast': 'gotoLast',
      'click a.page': 'gotoPage',
      'click a.serverfirst': 'gotoFirst',
      'click a.serverpage': 'gotoPage'
    },

    initialize: function() {
      this.collection.on('reset', this.render, this);
      this.collection.on('sync', this.render, this);

      this.$el.appendTo('#pagination');
    },

    render: function() {
      this.$el.html(this.template(this.collection));
      return this;
    },

    // Remove this view from the DOM.
    // Remove event listeners from: DOM, this.model
    remove: function() {
      this.stopListening();
      this.undelegateEvents();
      this.$el.remove();
    },

    nextResultPage: function (e) {
      e.preventDefault();
      this.collection.getNextPage();
    },

    previousResultPage: function (e) {
      e.preventDefault();
      this.collection.getPreviousPage();
    },

    gotoFirst: function (e) {
      e.preventDefault();
      this.collection.getFirstPage();
    },

    gotoLast: function (e) {
      e.preventDefault();
      this.collection.getLastPage();
    },

    gotoPage: function (e) {
      e.preventDefault();
      var page = + $(e.target).text();
      this.collection.getPage(page);
    },

    pageClass: function (p) {
      var cur = this.collection.state.currentPage;
      if (cur == p) {
        return 'active';
      } else if (Math.abs(cur - p) > 4) {
        return 'hidden';
      }
      return '';
    }

  });
  return PaginationView;
});
