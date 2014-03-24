Sites.EditSiteView = Ember.TextField.extend({
  didInsertElement: function() {
    this.$().focus();
  }
});

Ember.Handlebars.helper('edit-site', Sites.EditSiteView);
