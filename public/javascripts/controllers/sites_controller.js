Sites.SitesController = Ember.ArrayController.extend({
  actions: {
    
    createSite: function() {
      // Get the site name set by the "New Site" text field
      var name = this.get('newName');
      if (!name.trim()) { return; }

      // Create the new Site model
      var site = this.store.createRecord('site', {
        name: name
      });

      // Clear the "New Site" text field
      this.set('newName', '');

      // Save the new model
      site.save();
    }
  },

  count: function() {
    return this.get('length');
  }.property('@each'),

  inflection: function() {
    var count = this.get('count');
    return count === 1 ? 'item' : 'items';
  }.property('count')
});
