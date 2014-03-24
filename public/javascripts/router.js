Sites.Router.map(function () {
  this.resource('sites', { path: '/' }, function () {
    // additional child routes    
  });
});

Sites.SitesRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('site');
  }
});

Sites.SitesIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('sites');
  }
});

