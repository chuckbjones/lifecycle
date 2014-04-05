window.Sites = Ember.Application.create();

//Sites.ApplicationAdapter = DS.FixtureAdapter.extend();
Sites.ApplicationAdapter = DS.RESTAdapter.extend({
  host: 'http://localhost:3000',
  namespace: 'gato'
});

Sites.ApplicationSerializer = DS.RESTSerializer.extend({
  primaryKey: '_id'
});

Ember.Handlebars.helper('truncate', function(str, len) {
  if (str && str.length > len) {
    return str.substring(0, len - 3) + '...';
  } else {
    return str;
  }
});
