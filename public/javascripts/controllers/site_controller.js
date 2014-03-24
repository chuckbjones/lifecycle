Sites.SiteController = Ember.ObjectController.extend({
  actions: {
    editSite: function() {
      this.set('isEditing', true);
    },
    removeSite: function() {
      this.removeSite();
    },
    acceptChanges: function() {
      this.set('isEditing', false);

      if (Ember.isEmpty(this.get('model.name'))) {
        // The `acceptChanges` action gets sent twice when the user hits
        // enter (once via 'insert-newline' and once via 'focus-out').
        //
        // We debounce our call to 'removeSite' so that it only gets
        // made once.
        Ember.run.debounce(this, 'removeSite', 0);
      } else {
        this.get('model').save();
      }
    }
  },

  isEditing: false,

  removeSite: function() {
      var site = this.get('model');
      site.deleteRecord();
      site.save();
    },

});
