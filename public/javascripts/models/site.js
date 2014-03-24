Sites.Site = DS.Model.extend({
  name: DS.attr('string'),
  service: DS.attr('string'),
  url: DS.attr('string'),
  comments: DS.attr('string'),
  state: DS.attr('string'),
  site_type: DS.attr('string')
});

Sites.Site.FIXTURES = [
 {
  id: 1,
  name: 'Decommisioned Gato Site',
  service: 'gato',
  url: null,
  comments: 'Waiting for content from client. \n\nI suspect this site will never be used. Putting in Decommissioned',
  state: 'Decommissioned',
  site_type: 'Decommisioned Gato Site'
 },
 {
  id: 2,
  name: 'Biology',
  service: 'gato',
  url: 'http://www.bio.example.com/',
  comments: 'Hopping',
  state: 'Live in Gato 2',
  site_type: 'Academic Department'
 },
 {
  id: 3,
  name: 'VP University Advancement',
  service: 'gato',
  url: 'http://www.ua.example.com/',
  comments: 'Sandbox access is included in role\n\nUsers audited and updated: 02/13/2012\n\nUsers audited and updated: 11/07/2012',
  state: 'Live in Gato 2',
  site_type: 'VP Office'
 }
];
